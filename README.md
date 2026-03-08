# 🎙️ AI Podcast Generator

An AI-powered web application that generates podcast scripts and converts them into audio automatically from a given topic.

Users can select the podcast topic, podcast length, and voice style. The system then generates a complete podcast script using AI and converts it into audio using a text-to-speech engine.

---

## 🚀 Features

* Generate podcast scripts from any topic
* Choose podcast length (Short / Medium / Long)
* Select voice style for narration
* Convert podcast scripts into audio automatically
* Download the generated podcast audio
* Fully automated AI workflow

---

## 🧠 How It Works

1. User enters a topic and podcast preferences.
2. The frontend sends a request to an automation workflow.
3. The workflow generates a podcast script using AI.
4. The script is converted into speech using a text-to-speech engine.
5. The generated podcast audio is returned to the user.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn-ui

### Backend & Automation

* n8n (workflow automation)
* Google Gemini API (script generation)
* Murf AI (text-to-speech)

### Deployment

* Frontend hosted on Vercel
* Backend hosted on Render

---

## 🏗️ System Architecture

Frontend (React + Vite)
⬇
API Request
⬇
n8n Automation Workflow
⬇
Gemini AI → Generate Podcast Script
⬇
Murf AI → Convert Script to Audio
⬇
Return Podcast Audio to User

---

## 💻 Local Development

Clone the repository:

```bash
git clone https://github.com/kadiravyshnavi/podcast-dream-maker.git
```

Navigate to the project directory:

```bash
cd podcast-dream-maker
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## 🌐 Live Demo

Coming soon

---

## 🙌 Acknowledgements

The frontend UI was initially scaffolded using **Lovable AI** and further customized using React and Tailwind CSS.

---

## 👩‍💻 Author

Vyshnavi Kadira
AI & Automation Enthusiast
