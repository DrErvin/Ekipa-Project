# Ekipa Project - Student Platform

This is the frontend project for the Ekipa-Student Platform. The platform connects students with various opportunities like internships, jobs, and mentorships from Deutsche Telekom.

⚠️ **Important:** This frontend application requires a separate backend project to function correctly. Please follow the instructions below to set up both the frontend and backend projects.

### Requirements

1. [Node.js](https://nodejs.org/) installed on your machine.
2. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (for running the frontend locally).
3. Access to the backend repository.

Make sure you locally host the backend project, instructions available in the backend repository readme file
Backend Repo Link: https://github.com/DrErvin/Student_platform_server.git

### Setting Up the Frontend

To run the frontend application you simply start the live server from the project root directory. Here are a few ways to run live server:

1. Right-click anywhere in the editor and select "Open with Live Server".
2. Click on the Go Live button in the status bar at the bottom of the editor.
3. Using CLI, run `live-server` command in your favourite terminal.

## 🧪 Test Automation with Playwright

The testing/automation branch includes a comprehensive suite of automated tests written using **Playwright**. The suite includes **smoke tests** (critical path tests) and **functional tests** to verify the platform's features.

### 🛠 Setup Instructions

⚠️ **Important:** Once you cloned the repository and switched to **testing/automation** branch, **navigate to the playwright folder** from the project's root directory. Example instruction: `cd ./playwright/`

Next, Install dependencies

```bash
npm install
npx playwright install
```

### 🚀 How to Run the Tests

#### Step 1

To run the tests you need to locally run the backend and the frontend application. For running the backend, instructions are provided in the readme file of the backend repository: https://github.com/DrErvin/Student_platform_server.git

#### Step 2

To run the frontend application you can't run the live-server anymore, but the http static server instead. Example instruction:

```bash
 npm start
```

#### Step 3

Next, open up another terminal window to run tests. Navigate again to the playwright folder from the root directory. Now you can run tests.

##### Run All Tests

```bash
npx playwright test
```

#### Run Smoke Tests Only

```bash
npm run test:smoke
```

#### Run Functional Tests Only

```bash
npm run test:functional
```

### 📌 Notes

- Ensure the backend server is running before executing the tests.
- The tests are designed to run on **Chromium**, **Firefox**, and **WebKit** browsers.
- All tests are executed in **headless mode** by default. If you want to run them with a visible browser window, append the `--headed` flag to the test command.
