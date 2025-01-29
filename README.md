# Ekipa Project - Student Platform (Frontend)

This is the frontend project for the Ekipa-Student Platform, developed in collaboration with Deutsche Telekom. The platform connects students with various opportunities such as internships, jobs, and mentorship programs.

### ⚠️ Important Prerequisites:

For this project to function correctly, you must have the following:

**1. Running a Separate Backend Repository**

- Instructions on how to run and set up the backend are available in its README file.
- Backend Repository: [Backend Repo Link](https://github.com/DrErvin/Student_platform_server.git)

**2. DeepSeek AI Model Running Locally**

- This project uses the deepseek-v3 model for smart search functionality.
- The DeepSeekV3 model runs locally using Ollama (currently preferred solution due to efficiency and time constraints).

---

### 🔧 Project Setup (Frontend)

**1. Install Dependencies**

Ensure you have Node.js installed on your machine. Then, clone this repository and install dependencies:

```
git clone https://github.com/DrErvin/Ekipa-Project.git
cd Ekipa-Project
npm install
```

**2. Start the Frontend**

To start the frontend development server, run:

```
npm start
```

This will launch the Vite development server, which will serve the frontend locally.

Default Localhost: http://localhost:8080/
Vite configuration can be modified in `vite.config.js`

---

### 🧠 Setting Up DeepSeekV3 AI Model (Locally via Ollama)

We use Deepseek's AI model in our project for smart search feature, to showcase AI integrity in our project.

To enable AI-powered smart search functionality, you need to set up and run the **DeepSeekV3 model** locally.

Why are we currently using V3 model instead of the newer R1 model? DeepSeek-R1 (7B) model has average response times (1:30 - 2:00 minutes) on our current development hardware, while DeepSeek-V3 model is averaging 20-30 seconds per response.

**1. Install Ollama**

Ollama simplifies managing and running local AI models. Download and install it from [Ollama's official website](https://ollama.com/).

**2. Download and Run DeepSeekV3 Model**

Once Ollama is installed, run the following command in any CLI to download and set up the model:

```
ollama run nezahatkorkmaz/deepseek-v3:latest
```

This command will automatically first pull and start the model. If you want to first just pull the model and then run it. You can use the following commands separetely:

```
ollama pull nezahatkorkmaz/deepseek-v3:latest
ollama run nezahatkorkmaz/deepseek-v3:latest
```

**3. Verify Local AI API**

By default, Ollama hosts a local API out of the box after installing at: http://localhost:11434/

You can test if the model is working by sending a request to the Generate a Completion API endpoint:

- Endpoint: POST /api/generate
- This project only uses this endpoint to process and generate responses.
