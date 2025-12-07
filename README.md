# Dronacharyian

**A Modern Learning Management System (LMS)**

Dronacharyian is a feature-rich, responsive web application designed to facilitate online learning. Recently redesigned with a vibrant **Teal & Cyan** brand identity inspired by leading EdTech platforms, it offers a seamless experience for students to browse courses, manage tasks, and track their learning journey.

🚀 **[View Live Demo](https://dronacharyian.vercel.app/)**

## ✨ Key Features

*   **Brand Refresh**: A complete UI overhaul featuring a modern, clean, and vibrant design language.
*   **Course Catalog**: Browse available courses in a responsive grid layout with rich course cards.
*   **User Dashboard**: Personalized `UserHomepage` featuring a "Welcome" banner, "My Learning" list, and recommended courses.
*   **Secure Authentication**: Robust Login and Signup flows with JWT-based session management.
*   **Task Manager**: Integrated tool for users to organize their study schedules and tasks.
*   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

*   **Frontend**: EJS (Templating), CSS3 (Modern Flex/Grid, Custom Variables), JavaScript.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB Atlas.
*   **Authentication**: JSON Web Tokens (JWT), Bcrypt.
*   **Deployment**: Vercel (Serverless Configuration).

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Gaurav-99/Dronacharyian.git
cd Dronacharyian
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=800
```

### 4. Run the Application
```bash
npm start
```
The app will be available at `http://localhost:800` (or your defined port).

## 📂 Project Structure

*   `views/`: EJS templates for pages (`main/`, `user/`) and reusable components (`partials/`).
*   `public/`: Static assets including the new `udemy-style.css`, `sign-style.css`, and logo images.
*   `routes/`: Express route definitions for Auth, Courses, and Tasks.
*   `controllers/`: Logic for handling requests and database interactions.
*   `models/`: Mongoose schemas for User, Course, and Task data.

## ☁️ Deployment

This project is configured for deployment on **Vercel**.
1.  Import the repository to Vercel.
2.  Add your `MONGODB_URI` and `JWT_SECRET` in the Vercel Project Settings > Environment Variables.
3.  Deploy! (`vercel.json` handles the serverless configuration).

---
> *Built for educational purposes.*
