# 🎙️ AI Podcast Generator

An AI-powered web application that automatically generates podcast scripts and converts them into audio from a given topic.

Users can select the podcast topic, podcast length, and voice style. The system then generates a complete podcast script using AI and converts it into audio using a text-to-speech engine.

---

# 🚀 Live Demo

https://podcast-dream-maker.vercel.app

---

# 🚀 Features

* Generate podcast scripts from any topic
* Choose podcast length (Short / Medium / Long)
* Select voice style for narration
* Convert podcast scripts into audio automatically
* Download the generated podcast audio
* Fully automated AI workflow using n8n

---

# 🧠 How It Works

1. User enters a topic and podcast preferences.
2. The frontend sends a POST request to an n8n webhook.
3. The n8n workflow generates a podcast script using AI.
4. The script is converted into speech using a text-to-speech engine.
5. The generated podcast audio is returned to the user.

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn-ui

## Backend & Automation

* n8n Cloud (workflow automation)
* Google Gemini API (AI script generation)
* Murf AI (text-to-speech)

## Deployment

* Frontend hosted on Vercel
* Backend automation powered by n8n Cloud Webhooks

---

# 🏗️ System Architecture

Frontend (React + Vite)
⬇
POST Request (Webhook)
⬇
n8n Cloud Automation Workflow
⬇
Gemini AI → Generate Podcast Script
⬇
Murf AI → Convert Script to Audio
⬇
Return Podcast Audio URL to Frontend

---

# 💻 Local Development

Clone the repository:

git clone https://github.com/kadiravyshnavi/podcast-dream-maker.git

Navigate to the project directory:

cd podcast-dream-maker

Install dependencies:

npm install

Run the development server:

npm run dev

---

# 🙌 Acknowledgements

The frontend UI was initially scaffolded using Lovable AI and further customized using React and Tailwind CSS.

---

# 👩‍💻 Author

Vyshnavi Kadira
AI & Automation Enthusiast
