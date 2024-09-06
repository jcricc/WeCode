# WeCode Application Documentation 📚

WeCode is a web-based platform designed to assist users in improving their coding skills through practice exercises and AI-powered feedback. Built with **Next.js**, integrated with **Supabase** for backend services, and leveraging the **OpenAI API**, WeCode offers real-time code feedback, personalized question generation, and progress tracking.

---

## Table of Contents
- [Technologies Used](#technologies-used)
- [Directory Structure](#directory-structure)
- [API Endpoints](#api-endpoints)
  - [ask_for_help](#ask_for_help)
  - [check_code](#check_code)
  - [generate_question](#generate_question)
  - [get_user_progress](#get_user_progress)
- [Front-End Functionality](#front-end-functionality)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)

---

## 🛠 Technologies Used

- **Next.js**: Framework for server-side rendering and routing.
- **Supabase**: For authentication and managing user data.
- **OpenAI API**: Provides AI-driven features like question generation and code validation.
- **CodeMirror**: A customizable web code editor.
- **TailwindCSS**: CSS framework for styling.

---

## 📂 Directory Structure

```bash
wecode/
├── api/
│   ├── ask_for_help/         # Endpoint to ask for AI assistance
│   ├── check_code/           # Endpoint to check code correctness
│   ├── generate_question/    # Endpoint to generate questions
│   └── get_user_progress/    # Endpoint to fetch user progress
├── app/
│   ├── exercise/             # Coding exercise page
│   ├── auth/                 # Authentication pages (login/signup)
│   └── page.js               # Main entry page
├── components/               # React components
├── lib/                      # Helper functions, Supabase client
├── public/                   # Public assets (images, etc.)
├── styles/                   # Custom CSS/Tailwind styles
└── package.json              # Project dependencies and scripts

🔌 API Endpoints
ask_for_help
API Path: /api/ask_for_help
Method: POST
Description: Allows users to ask programming-related questions. Uses OpenAI to provide detailed responses.

Payload:

{
  "question": "How do I reverse a string in Python?",
  "helpQuery": "Is there a more efficient way to do this?"
}
Response:

{
  "response": "You can reverse a string using slicing in Python: 'your_string[::-1]'."
}
check_code
API Path: /api/check_code
Method: POST
Description: Validates user code by running it and checking if the solution is correct.

Payload:

{
  "code": "def reverse_string(s): return s[::-1]",
  "question": "Write a function that reverses a string."
}

Response:

{
  "correct": true,
  "feedback": "The function works correctly for all input cases."
}
generate_question
API Path: /api/generate_question
Method: GET
Description: Generates coding questions based on language and difficulty level.
Query Parameters:

language: Programming language (e.g., python, javascript)
difficulty: Difficulty level (beginner, intermediate, advanced)

Example:

GET /api/generate_question?language=python&difficulty=beginner

Response:

{
  "question": "Write a Python function that reverses a string. The function should take a string as input and return the reversed version of that string."
}
get_user_progress
API Path: /api/get_user_progress
Method: GET
Description: Retrieves a user's progress, such as points, level, and achievements.
Query Parameters:

userId: Unique identifier of the user.

Example:

GET /api/get_user_progress?userId=123

Response:

{
  "points": 150,
  "level": 2,
  "achievements": ["Completed 10 exercises", "Solved 5 advanced problems"]
}

💻 Front-End Functionality

Exercise Page (app/exercise/page.js): Users select coding questions based on programming language and difficulty. CodeMirror allows users to write and execute code within the app.
Tabs: Users can switch between "Question" and "Help" tabs for assistance.
Real-Time Feedback: After submission, the code is checked, and feedback is provided.
Progress Tracking: User progress (points, levels, achievements) is stored in Supabase and loaded on login.

🚀 Getting Started
Prerequisites
Node.js and npm installed
A Supabase account (for authentication and data storage)
An OpenAI API key (for AI-driven features)
Installation

Clone the repository:

git clone https://github.com/jcricc/wecode.git
cd wecode

Install dependencies:

npm install
Set up environment variables:

Create a .env file and add:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key

Start the development server:

npm run dev

Open your browser: Visit http://localhost:3000

🤝 Contributing
We welcome contributions! To get involved:

Fork the repository.
Create a new feature branch.
Submit a pull request with a clear description of your changes.
Thank you for checking out WeCode! Happy coding! 🚀
