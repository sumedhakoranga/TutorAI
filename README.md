# Tutor.AI

## Project Overview
Tutor.AI is a complete education platform focused on extending support to underprivileged school students. We leverage the power of Artificial Intelligence and connect students to their teachers on the app. We have a knowledge-tracing AI model, which provides students with questions that will help them improve their weaknesses and talk to a Gemini Pro-powered AI tutor who will help answer their queries.

## Implementation
The core of our web application is developed using Angular, with Bootstrap integrated to ensure responsive design, making it universally accessible. Additionally, we've utilized Progressive Web App (PWA) technology for broader reach. The backend is crafted with Node.js, and while most of our codebase is in TypeScript, the knowledge tracing model is implemented in Python. This model is hosted on Google Cloud Functions and Cloud Run. We've employed Firebase Extensions and Vertex AI to leverage Gemini API. Data storage is efficiently managed using Firebase Realtime Database for real-time data and Firestore for storing Gemini prompts and responses. User authentication is streamlined through Firebase Authentication. Our website benefits from Firebase Hosting, featuring an auto-deployment mechanism set up via GitHub Actions, ensuring our application is always up-to-date and available for users.

## Scalability / Next Steps
One of the next steps we are planning is to make the website multilingual. We have accumulated question datasets in Spanish, German, Greek, Russian, Turkish, Arabic, Vietnamese, Thai, Chinese, and Hindi and will be using Google Translate API. This will ensure that an even larger audience can access the application and benefit from it.

## Run Locally
Ensure you have Node.js installed. Clone the repository and run the below in Terminal:
```bash
npm install
npm start
```

Open http://localhost:4200/ in browser.

## Contributors
- [Sumedha Koranga](https://sumedha.info/)
- [Aniket Sharma](https://www.aniketsharma.net/)
