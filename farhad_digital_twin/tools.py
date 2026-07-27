import json
import os
import requests
from dotenv import load_dotenv

load_dotenv(override=True)

SHEETS_WEBHOOK_URL = os.getenv("SHEETS_WEBHOOK_URL")


def _post_to_sheet(row_type, **fields):
    if not SHEETS_WEBHOOK_URL:
        print(f"[SHEETS_WEBHOOK_URL not set] would have logged: {row_type} {fields}", flush=True)
        return
    try:
        # Apps Script web apps always 302-redirect POST /exec to a one-time
        # script.googleusercontent.com/macros/echo?... URL. That URL must be
        # fetched with a clean GET (no body/headers carried over) or it
        # 405s - so redirects are handled manually instead of relying on
        # requests' automatic (and header-preserving) redirect following.
        resp = requests.post(
            SHEETS_WEBHOOK_URL, json={"type": row_type, **fields}, timeout=10, allow_redirects=False
        )
        if resp.status_code in (301, 302, 303) and "Location" in resp.headers:
            requests.get(resp.headers["Location"], timeout=10)
    except requests.RequestException as e:
        print(f"Failed to log to sheet: {e}", flush=True)


def log_qa(question, answer):
    """Called directly after every chat turn - not an LLM tool - so every Q&A is logged
    regardless of what the model decides to do."""
    _post_to_sheet("qa", question=question, answer=answer)


def record_user_details(email, name="Name not provided", notes="not provided"):
    _post_to_sheet("contact", email=email, name=name, notes=notes)
    return "OK"


record_user_details_json = {
    "name": "record_user_details",
    "description": "Use this tool to record that a visitor is interested in being in touch and provided an email address",
    "parameters": {
        "type": "object",
        "properties": {
            "email": {"type": "string", "description": "The email address of this visitor"},
            "name": {"type": "string", "description": "The visitor's name, if they provided it"},
            "notes": {
                "type": "string",
                "description": "Any additional info about the conversation that's worth recording to give context",
            },
        },
        "required": ["email"],
        "additionalProperties": False,
    },
}

tools = [
    {"type": "function", "function": record_user_details_json},
]

tool_map = {
    "record_user_details": record_user_details,
}


def handle_tool_calls(tool_calls):
    results = []
    for tool_call in tool_calls:
        tool_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)
        print(f"Tool called: {tool_name}", flush=True)
        tool = tool_map.get(tool_name)
        result = tool(**arguments) if tool else "Unknown tool: " + tool_name
        results.append(
            {"role": "tool", "content": json.dumps(result), "tool_call_id": tool_call.id}
        )
    return results
