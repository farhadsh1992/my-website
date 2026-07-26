"""Lightweight HTTP wrapper around the digital twin's chat() logic, so it can be
called from the static website (../public/ai-twin.js) instead of only through the
Gradio UI in app.py. Run with:

    uv run --no-project uvicorn api:app --reload --port 8799

from this folder (or use .venv/bin/python -m uvicorn api:app --port 8799).
"""

import os
import sys
from pathlib import Path
from typing import List, Optional

BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))
os.chdir(BASE_DIR)  # profile.md / docs/ are opened with relative paths in context.py

from dotenv import load_dotenv

load_dotenv(override=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

from context import TWIN_SYSTEM_PROMPT, TWIN_NAME, TWIN_GREETING
from tools import tools, handle_tool_calls, log_qa

MODEL_NAME = "llama-3.3-70b-versatile"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Models the frontend's model-select dropdown is allowed to request. Add new entries here
# (and a matching <option> in ai-twin.html) as more models/providers are wired up.
AVAILABLE_MODELS = {
    "llama-3.3-70b-versatile": "llama-3.3-70b-versatile",
}

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = None
    model: Optional[str] = None


@app.get("/health")
def health():
    return {"status": "ok", "groq_configured": bool(GROQ_API_KEY), "twin_name": TWIN_NAME}


@app.get("/greeting")
def greeting():
    return {"greeting": TWIN_GREETING}


@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    if not GROQ_API_KEY:
        return {
            "error": "GROQ_API_KEY is not set. Add a free key from console.groq.com to your .env file to enable the AI Twin."
        }

    model_name = AVAILABLE_MODELS.get(req.model, MODEL_NAME)

    groq = OpenAI(api_key=GROQ_API_KEY, base_url="https://api.groq.com/openai/v1")
    system = [{"role": "system", "content": TWIN_SYSTEM_PROMPT}]
    clean_history = [
        {"role": m.role, "content": m.content}
        for m in (req.history or [])
        if m.role in ("user", "assistant") and m.content
    ]
    messages = system + clean_history + [{"role": "user", "content": req.message}]

    response = groq.chat.completions.create(model=model_name, messages=messages, tools=tools)
    while response.choices[0].finish_reason == "tool_calls":
        tool_message = response.choices[0].message
        tool_calls = tool_message.tool_calls
        results = handle_tool_calls(tool_calls)
        messages.append(tool_message)
        messages.extend(results)
        response = groq.chat.completions.create(model=model_name, messages=messages, tools=tools)

    answer = response.choices[0].message.content
    log_qa(req.message, answer)
    return {"answer": answer}
