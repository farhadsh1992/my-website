---
title: Farhad Digital Twin
emoji: 🤖
colorFrom: gray
colorTo: red
sdk: gradio
sdk_version: 6.20.0
app_file: app.py
pinned: false
---

# Farhad's Digital Twin

An AI chatbot that answers visitor questions about Farhad (career, research, background) using
an open-source LLM (Llama 3.3 via Groq), never says anything negative about him, and logs every
question + answer to a Google Sheet named `ai-agents`.

Meant to be embedded on/linked from farhadshad.com, LinkedIn, and the ISR profile page.

## 1. Fill in your profile

Edit [`profile.md`](profile.md) with your bio, LinkedIn content, ISR page content, website
content, and skills. This file is the *only* thing the AI knows about you — anything missing
here, it won't be able to answer.

## 2. Get a free Groq API key

1. Sign up at https://console.groq.com
2. Create an API key
3. Add it to your root `.env` file (or a local `.env` in this folder):

```
GROQ_API_KEY=gsk_...
```

## 3. Wire up the Google Sheet logging

1. Create (or open) a Google Sheet named `ai-agents`.
2. In the Sheet, go to **Extensions > Apps Script**.
3. Delete the placeholder code and paste in the contents of [`apps_script.gs`](apps_script.gs).
4. Click **Deploy > New deployment**, choose type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize it (you'll see a Google warning since it's your own unverified
   script — click through "Advanced > Go to project (unsafe)", this is safe since you wrote it).
6. Copy the Web App URL (ends in `/exec`) and add it to your `.env`:

```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

The script auto-creates two tabs the first time it's called: `QA` (timestamp, question, answer)
and `Contacts` (timestamp, name, email, notes — filled when a visitor leaves their email).

If `SHEETS_WEBHOOK_URL` isn't set, the app just prints what it would have logged, so you can
run it before finishing the Sheet setup.

## 4. Run it

```bash
cd 1_foundations/community_contributions/farhad_digital_twin
uv run app.py
```

This launches a local Gradio chat UI.

## 5. Deploy publicly

Two different deployments exist for two different purposes:

**A standalone chat page (Hugging Face Space, free, Gradio UI)** - good for linking directly
from LinkedIn/ISR, or just trying it out in a browser:

1. Create a new Space at https://huggingface.co/new-space - pick **Gradio** as the SDK, any name
   (e.g. `farhad-digital-twin`). Docker Spaces require a paid plan on Hugging Face, but Gradio
   Spaces are free, and `app.py` is already a standard Gradio app - no changes needed. Note that
   the free tier now runs on **ZeroGPU** hardware, so `app.py`'s `chat()` function needs the
   `@spaces.GPU()` decorator (already added) even though no GPU is actually used.
2. In the Space's **Settings > Variables and secrets**, add a secret named `GROQ_API_KEY` with
   your Groq key (and `SHEETS_WEBHOOK_URL` too, if you've set that up).
3. Push this folder's contents to the Space's git remote (same as pushing to GitHub, just a
   different remote URL - the Space page shows the exact `git remote add` / `git push` commands).

In testing, ZeroGPU's free tier queued/rejected anonymous API calls from outside sites (as
opposed to visitors using the Space's own page directly), so it isn't used as the website's
backend - see below instead.

**The actual farhadshad.com chat widget (Render, free, plain FastAPI)** - `api.py` is a thin
HTTP wrapper around the same chat logic, with no Gradio/GPU dependency at all:

1. On [render.com](https://render.com), create a **Web Service** connected to this GitHub repo,
   with **Root Directory** set to `farhad_digital_twin`.
2. **Build Command**: `pip install -r requirements.txt` · **Start Command**:
   `uvicorn api:app --host 0.0.0.0 --port $PORT` · **Instance Type**: Free.
3. Add `GROQ_API_KEY` under **Environment Variables**.
4. `../public/ai-twin.js` already points `API_URL` at the resulting `.onrender.com` URL for any
   visitor not on localhost. Render's free tier sleeps after 15 minutes of inactivity, so the
   first message after a quiet period can take up to a minute to respond.

## Notes

- Every single question and answer is logged automatically in code (see `log_qa` in
  [`tools.py`](tools.py)), not left up to the model to decide, so nothing is missed.
- The system prompt in [`context.py`](context.py) instructs the model to never say anything
  negative about you and to stay on professional topics.
- Swap `MODEL_NAME` in [`app.py`](app.py) for any other Groq-hosted open model
  (see https://console.groq.com/docs/models) if you want a different Llama size or a different
  open-weight model entirely.
