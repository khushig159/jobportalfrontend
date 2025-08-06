<h1 align="center">🚀 Workora – Job Portal Frontend</h1>

<p align="center">
  <i>A smart job-hunting platform built to connect candidates and recruiters seamlessly</i>
</p>

<p align="center">
  <a href="https://workorajobs.netlify.app/" target="_blank">
    🌐 Live Website
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/AI%20Resume%20Parser-Integrated-purple?style=flat-square" />
  <img src="https://img.shields.io/badge/Roles-Job%20Seeker%20%26%20Recruiter-orange?style=flat-square" />
</p>

---

## 🧩 Overview

**Workora** is a smart and intuitive job portal designed to streamline the recruitment process for both **Job Seekers** and **Recruiters**.

With powerful features like **AI-based resume parsing**, **job suggestions**, and **real-time chat**, Workora ensures that users find the right opportunities and recruiters find the right talent — faster and smarter.

👉 **Live Demo:** [https://workorajobs.netlify.app/](https://workorajobs.netlify.app/)

---

## 🔑 Key Features

### 🎯 For Job Seekers
- 🔐 User registration with secure login & email verification
- 📄 Create, edit, and manage personal job profiles
- 📥 **Upload resume and get AI-based job suggestions**
- 🧠 **Resume parsing with personalized career guidance**
- 🔍 Explore, filter, and apply for jobs
- 📌 Save favorite jobs
- 🧾 View all applied jobs
- 🗒️ Maintain private notes for each application
- 👨‍💼 Coonect with other peers and grow yout netord
- 💬 Real-time chat with other users
- 🔄 Password reset and recovery
- 🚫 Access control for secure navigation
- 📧 Email Alerts after you signup or login 

### 💼 For Recruiters
- 🔐 Recruiter registration & authentication
- 📝 Post, edit, and delete job listings
- 📂 View applicants and their resumes
- 🔎 Filter and manage candidate lists
- 👨‍💼 Manage recruiter profile
- 🚫 Protected routes for role-based access
- 💬 Go through all Candidates and explore talent
- 📧 Email Alerts after you signup or login 


---

## 🧠 AI Integration

- ✅ **Resume Parsing**: Extract key data from uploaded resumes
- ✅ **Job Suggestions**: Based on skills and experience in resume
- ✅ **Career Guidance**: AI chatbot provides job and career-specific advice only (strictly domain-restricted)

---

> **Note:** Resume files are stored using **Cloudinary**, a secure and encrypted cloud service.  
> You may not see the resume previews if access permissions are restricted


## 🧰 Tech Stack

| Layer              | Technology                            |
|--------------------|----------------------------------------|
| **Frontend**       | React.js, React Router DOM             |
| **AI Integration** | OpenAI API (custom prompts for domain-limited bot) |
| **State Management** | React Hooks, Context API            |
| **File Handling**  | FileReader API (for resume upload)     |
| **Resume Parsing** | Custom JS Parser + OpenAI enhancement |
| **Chat**           | Real-time chatbot with prompt routing  |
| **Styling**        | CSS Modules                           |
| **Routing**        | Protected & role-based routes         |
| **Deployment**     | Netlify ([Live Link](https://workorajobs.netlify.app/)) |

---

## 🗂️ Project Structure

```bash
src/
├── assets/                # Static assets (images, etc.)
│
├── components/            # Reusable UI components
│   ├── AccessDenied.jsx
│   ├── BlogCard.jsx
│   ├── ChatBot.jsx
│   ├── ChatComponent.jsx
│   ├── Connections.jsx
│   ├── Dashboard.jsx
│   ├── EmailVerification.jsx
│   ├── EmailVerificationrec.jsx
│   ├── Filters.jsx
│   ├── JobCard.jsx
│   ├── Jobdetails.jsx
│   ├── Loading.jsx
│   ├── Notes.jsx
│   ├── ProtectedRoute.jsx
│   ├── ProtectedRouteRec.jsx
│   ├── RedirectHandler.jsx
│   └── UserProfile.jsx
│
├── module/                # Sub-components or utility views
│   ├── Allcandidates.jsx
│   ├── Allusers.jsx
│   ├── Applicants.jsx
│   ├── AppliedJobs.jsx
│   ├── EditJobForm.jsx
│   ├── ForgotPassword.jsx
│   ├── ForgotPasswordrec.jsx
│   ├── HomePage.jsx
│   ├── HomePageRecruiter.jsx
│   ├── JobListing.jsx
│   ├── PostJobsForm.jsx
│   ├── RecruiterLogin.jsx
│   ├── RecruiterProfileEdit.jsx
│   ├── ResetPassword.jsx
│   ├── Resetpasswordrec.jsx
│   ├── RootLayout.jsx
│   ├── RootLayoutRecruiter.jsx
│   ├── SavedJobs.jsx
│   ├── Sidebar.jsx
│   ├── SidebarRecruiter.jsx
│   ├── SignUpRecruiter.jsx
│   ├── SignUpSeeker.jsx
│   ├── StartPage.jsx
│   ├── UserLogin.jsx
│   ├── UserProfileEdit.jsx
│   └── UsersProfiles.jsx
│
├── style/                 # Component-specific styling
│   ├── Applicants.css
│   ├── Blogs.css
│   ├── ChatBot.css
│   ├── DashboardCharts.css
│   ├── FindJobs.css
│   ├── HomePage.css
│   ├── HomePageRecruiter.css
│   ├── JobListing.css
│   ├── JobPosts.css
│   ├── Logins.css
│   ├── MainNavigation.css
│   ├── Modal.css
│   ├── RecruiterProfile.css
│   ├── RootLayout.css
│   ├── SavedJobs.css
│   ├── SignUp.css
│   ├── SignUpForm.css
│   ├── StartPage.css
│   └── UserProfile.css
│
├── App.jsx                # App routing logic
├── index.js               # Root render logic
└── main.jsx               # (Vite entry point, if applicable)


---

## 📦 Installation

```bash
# Step 1: Clone the repository
git clone https://github.com/your-username/job-portal-frontend.git
cd job-portal-frontend

# Step 2: Install dependencies
npm install

# Step 3: Run the application
npm start

## 🚀 Future Enhancements
- Admin dashboard for platform moderation
- Email alerts for job applications
- PDF export for user profile & applications
- Advanced analytics for recruiters
- AI interview preparation suggestions

## 🙋‍♀️ About the Developer
**Khushi Gupta**
💻 Frontend Developer | 🧠 AI Explorer | 📚 Engineering Student
📧 khushig1592005@gmail.com
🔗  www.linkedin.com/in/khushi-gupta-b756bb277
