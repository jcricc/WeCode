WeCode Application Documentation

WeCode is a web-based platform designed to assist users in improving their coding skills through practice exercises and AI-powered feedback. It is built using the Next.js framework, integrated with Supabase for backend services, and leverages the OpenAI API for generating programming questions, verifying code correctness, and providing user assistance.

The application enables users to solve coding problems, receive real-time feedback on their code, and track their progress over time. Key features include code execution, personalized question generation, and AI-assisted help.

Table of Contents

Technologies Used
Directory Structure
API Endpoints
ask_for_help
check_code
generate_question
get_user_progress
Front-End Functionality
Getting Started
Contributing

Technologies Used:

Next.js: The React framework for server-side rendering and routing.
Supabase: Used for authentication and managing user data and progress.
OpenAI API: Provides AI-driven features like code assistance and question generation.
CodeMirror: A customizable code editor for the web, used for displaying and editing code in the browser.
TailwindCSS: CSS framework for styling the UI.

Directory Structure
The WeCode application follows a typical Next.js project structure:

wecode/
│
├── api/
│   ├── ask_for_help/          # Endpoint to ask for AI help
│   ├── check_code/            # Endpoint to check the correctness of code
│   ├── generate_question/     # Endpoint to generate coding questions
│   └── get_user_progress/     # Endpoint to retrieve user's progress
│
├── app/
│   ├── exercise/              # Main coding exercise page
│   ├── auth/                  # Authentication pages for login and signup
│   └── page.js                # Main entry page
│
├── components/                # React components used throughout the app
├── lib/                       # Helper functions and Supabase client initialization
├── public/                    # Public assets such as images
├── styles/                    # Custom styling using CSS or Tailwind
└── package.json               # Project dependencies and scripts

API Endpoints:

ask_for_help API
Path: /api/ask_for_help

Method: POST
Description: This endpoint allows users to ask specific programming-related questions. It utilizes OpenAI to provide detailed and helpful responses.
Payload:
question: The main coding question or challenge the user is working on.
helpQuery: A specific question the user needs help with.
Response:
Returns a detailed response from the AI to help clarify the user's query.

Example:
POST /api/ask_for_help
{
  "question": "How do I reverse a string in Python?",
  "helpQuery": "Is there a more efficient way to do this?"
}

Response:
{
  "response": "You can reverse a string using slicing in Python: 'your_string[::-1]'."
}
check_code API
Path: /api/check_code

Method: POST

Description: Validates the user's code by executing it and checking if it solves the problem correctly.

Payload:

code: The user's submitted code.
question: The coding question that the code attempts to solve.
Response:

correct: Boolean indicating if the code is correct.
feedback: AI-generated feedback on the correctness of the code.

Example:
POST /api/check_code
{
  "code": "def reverse_string(s): return s[::-1]",
  "question": "Write a function that reverses a string."
}

Response:
{
  "correct": true,
  "feedback": "The function works correctly for all input cases."
}
generate_question API
Path: /api/generate_question

Method: GET

Description: Generates a coding question based on the language and difficulty level provided.

Query Parameters:

language: The programming language for the question (e.g., python, javascript).
difficulty: The difficulty level of the question (beginner, intermediate, advanced).
Response:

question: A coding question with problem description, input/output specifications, and any constraints.
Example:
json
Copy code
GET /api/generate_question?language=python&difficulty=beginner

Response:
{
  "question": "Write a Python function that reverses a string. The function should take a string as input and return the reversed version of that string."
}
get_user_progress API
Path: /api/get_user_progress

Method: GET

Description: Retrieves the progress of a specific user, such as points, level, and achievements.

Query Parameters:

userId: The unique identifier of the user whose progress is being fetched.
Response:

A JSON object containing the user's progress data or an error message if the user ID is invalid.

Example:
GET /api/get_user_progress?userId=123

Response:
{
  "points": 150,
  "level": 2,
  "achievements": ["Completed 10 exercises", "Solved 5 advanced problems"]
}

Front-End Functionality:
Exercise Page (app/exercise/page.js)

Allows users to select a coding question based on the chosen programming language and difficulty.
Users can write and run their code in a CodeMirror editor, which is tailored for different programming languages.
Upon code submission, the backend checks the code and provides feedback.
Question & Help Tabs:

Users can switch between the "Question" tab to see the coding prompt and the "Help" tab to ask for AI assistance.
Real-time Feedback:

Upon code submission, feedback is provided on whether the solution is correct, along with suggestions for improvement if necessary.
Progress Tracking:

User progress is saved to Supabase and loaded upon login. Progress is shown as points, level, and achievements.

Getting Started

Prerequisites
Node.js and npm installed.
A Supabase account for user authentication and data storage.
An OpenAI API Key for AI-driven features.

Installation

Clone the repository:
git clone https://github.com/jcricc/wecode.git
cd wecode

Install the dependencies:

npm install
Set up environment variables:

Create a .env file in the root of the project and add the following:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key

Start the development server:
npm run dev
Open your browser and go to http://localhost:3000.

Contributing
We welcome contributions to the WeCode project. Here's how you can get involved:

Fork the repository.
Create a new feature branch.
Submit a pull request with a description of your changes.
