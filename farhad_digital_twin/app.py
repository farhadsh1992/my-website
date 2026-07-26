import os
from openai import OpenAI
from context import TWIN_SYSTEM_PROMPT, TWIN_NAME, TWIN_GREETING
from tools import tools, handle_tool_calls, log_qa
from dotenv import load_dotenv
import gradio as gr

load_dotenv(override=True)

MODEL_NAME = "llama-3.3-70b-versatile"

groq = OpenAI(api_key=os.getenv("GROQ_API_KEY"), base_url="https://api.groq.com/openai/v1")

system = [{"role": "system", "content": TWIN_SYSTEM_PROMPT}]


def chat(message, history):
    clean_history = [
        {"role": m["role"], "content": m["content"]}
        for m in history
        if m.get("role") in ("user", "assistant") and m.get("content")
    ]
    messages = system + clean_history + [{"role": "user", "content": message}]
    response = groq.chat.completions.create(model=MODEL_NAME, messages=messages, tools=tools)
    while response.choices[0].finish_reason == "tool_calls":
        tool_message = response.choices[0].message
        tool_calls = tool_message.tool_calls
        results = handle_tool_calls(tool_calls)
        messages.append(tool_message)
        messages.extend(results)
        response = groq.chat.completions.create(model=MODEL_NAME, messages=messages, tools=tools)
    answer = response.choices[0].message.content
    log_qa(message, answer)
    return answer


if __name__ == "__main__":
    gr.ChatInterface(
        chat,
        title=f"{TWIN_NAME} — Farhad's AI Twin",
        description="Ask me about Farhad's career, research, papers, and experience.",
        chatbot=gr.Chatbot(
            value=[{"role": "assistant", "content": TWIN_GREETING}],
            show_label=False,
        ),
    ).launch()
