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

This launches a local Gradio chat UI. To make it publicly reachable (e.g. to embed on
farhadshad.com or link from LinkedIn/ISR), deploy it the same way the course teaches for the
`twin/` lab — e.g. push this folder to a Hugging Face Space — and then link/embed that URL.

## Notes

- Every single question and answer is logged automatically in code (see `log_qa` in
  [`tools.py`](tools.py)), not left up to the model to decide, so nothing is missed.
- The system prompt in [`context.py`](context.py) instructs the model to never say anything
  negative about you and to stay on professional topics.
- Swap `MODEL_NAME` in [`app.py`](app.py) for any other Groq-hosted open model
  (see https://console.groq.com/docs/models) if you want a different Llama size or a different
  open-weight model entirely.
