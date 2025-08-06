<h1 align="center">💼 Workora – Job Portal Frontend</h1>

<p align="center">
  A modern and responsive job portal web application that connects top talent with top companies.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Frontend-Complete-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Users-Recruiters%20%7C%20Job%20Seekers-orange?style=flat-square" />
</p>

---

## 🚀 Project Overview

**Workora** is a fully responsive and feature-rich job portal built with React.js.  
It offers separate flows for:
- 🧑‍💼 **Recruiters** – to post jobs, manage applicants, and connect with talent
- 👤 **Job Seekers** – to search, apply, save, and track job applications

👉 **Live Demo:** [https://workorajobs.netlify.app/](https://workorajobs.netlify.app/)

---

## 🎯 Core Features

### 👥 For Job Seekers
- ✅ User Registration & Secure Login
- 📧 Email Verification Flow
- 📝 Profile Creation & Editing
- 🔍 Explore & Filter Jobs
- 📄 Detailed Job Descriptions
- 📌 Save Jobs for Later
- 🧾 Track Applied Jobs
- 🧠 Maintain Personal Notes
- 💬 Chat with Recruiters
- 🔑 Forgot/Reset Password
- 🚫 Protected Access Handling

### 🧑‍💼 For Recruiters
- ✅ Recruiter Registration & Login
- 📧 Email Verification Flow
- 🗂️ Post & Edit Job Listings
- 👨‍💻 View Applicants by Job
- 🔍 Candidate Filtering
- 🧾 All Candidates Management
- ✏️ Update Recruiter Profile
- 🤝 Connect with Job Seekers
- 💬 Integrated Chat Feature
- 🚫 Role-Based Route Protection

---

## 🧩 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | `React.js` (18+)    |
| State       | `React Hooks`, `Context API` |
| Routing     | `React Router DOM`  |
| Security    | Role-based routes, ProtectedRoute components |
| Features    | Realtime Chat, Notes System, Email Flow |
| Hosting     | Netlify (Live Demo)

---

## 🗂️ Folder & File Highlights

```bash
📁 src/
│
├── Auth/
│   ├── SignUpSeeker.jsx / SignUpRecruiter.jsx
│   ├── UserLogin.jsx / RecruiterLogin.jsx
│   ├── EmailVerification.jsx / EmailVerificationrec.jsx
│   ├── ForgotPassword.jsx / ForgotPasswordrec.jsx
│   ├── ResetPassword.jsx / Resetpasswordrec.jsx
│   └── AccessDenied.jsx / AccessDeniedRec.jsx
│
├── Jobs/
│   ├── JobListing.jsx
│   ├── JobDetails.jsx
│   ├── PostJobsForm.jsx
│   ├── EditJobForm.jsx
│   ├── AppliedJobs.jsx
│   └── SavedJobs.jsx
│
├── Profiles/
│   ├── UserProfile.jsx / UserProfileEdit.jsx
│   ├── RecruiterProfileEdit.jsx
│   ├── AllCandidates.jsx / Applicants.jsx
│   └── UsersProfiles.jsx
│
├── Chat/
│   ├── ChatComponent.jsx
│   └── ChatBot.jsx
│
├── Common/
│   ├── ProtectedRoute.jsx / ProtectedRouteRec.jsx
│   ├── Sidebar.jsx / SidebarRecruiter.jsx
│   ├── RootLayout.jsx / RootLayoutRecruiter.jsx
│   ├── Dashboard.jsx / StartPage.jsx / HomePage.jsx
│   ├── RedirectHandler.jsx / Loading.jsx / Notes.jsx
│   └── Connections.jsx / Filters.jsx / BlogCard.jsx
