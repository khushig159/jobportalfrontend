import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import HomePageRecruiter from './pages/HomePageRecruiter';
import HomePage from './pages/HomePage';
import RootLayout from './pages/RootLayout';
import StartPage from './pages/StartPage';
import SignUpSeeker from './pages/SignUpSeeker';
import SignUpRecruiter from './pages/SignUpRecruiter';
import UserLogin from './pages/UserLogin';
import RecruiterLogin from './pages/RecruiterLogin';
import RootLayoutRecruiter from './pages/RootLayoutRecruiter';
import PostJobsForm from './pages/PostJobsForm';
import JobListing from './pages/JobListing';
import UserProfile from './components/UserProfile';
import EditJobForm from './pages/EditJobForm';
import RecruiterProfileEdit from './pages/RecruiterProfileEdit';
import SavedJobs from './pages/SavedJobs';
import AppliedJobs from './pages/AppliedJobs';
import Applicants from './pages/Applicants';
import UserProfileEdit from './pages/UserProfileEdit';
import Allcandidates from './pages/Allcandidates'
import ProtectedRoute from './components/ProtectedRoute';
import AccessDenied from './components/AccessDenied';
import ProtectedRouterec from './components/ProtectedRouteRec';
import AccessDeniedrec from './components/AccessDeniedRec';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ForgotPasswordrec from './pages/ForgotPasswordrec';
import Resetpasswordrec from './pages/Resetpasswordrec';
import EmailVerification from './components/EmailVerification';
import EmailVerificationrec from './components/EmailVerificationrec';
import AllUsers from './pages/Allusers';
import UsersProfiles from './pages/UsersProfiles';
import ChatComponent from './components/ChatComponent';
import ChatBot from './components/ChatBot';
import RedirectHandler from './components/RedirectHandler';
console.log(import.meta.env.VITE_API_URL)


const router = createBrowserRouter([
  {
    path:"/",
    element:<RedirectHandler/>,
  },
  {
    path:"/start",
    element:<StartPage/>,
  },
  {
    path:"/user-signup",
    element:<SignUpSeeker/>
  },
  
  {
    path:'/user-login',
    element:<UserLogin/>
  },
  {
    path:"/recruiter-signup",
    element:<SignUpRecruiter/>
  },
  {
    path:"/recruiter-login",
    element:<RecruiterLogin/>
  },
  {
    path:'/forgot-paasword',
    element:<ForgotPassword/>
  },
  {
    path:'/reset-paasword/:token',
    element:<ResetPassword/>
  },
  {
    path:'/email-verify',
    element:<EmailVerification/>
  },
  {
    path:'/email-verifyrec',
    element:<EmailVerificationrec/>
  },
  {
    path:'/forgot-paaswordrec',
    element:<ForgotPasswordrec/>
  },
  {
    path:'/reset-paasword2/:token',
    element:<Resetpasswordrec/>
  },
  {
    path: "/main",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path:'allusers',
        element:<AllUsers/>
      },
      {
        path:'usersprofile/:id',
        element:<UsersProfiles/>
      },
      {
        path:'chatcomponent',
        element:<ChatComponent/>
      },
      {
        path:"savedjobs",
        element:<SavedJobs/>
      },
      {
        path:"appliedjobs",
        element:<AppliedJobs/>
      },
      {
        path:"userprofile",
        element:<UserProfile/>
      },
      {
        path:'userprofile-edit',
        element:<UserProfileEdit/>
      },
      {
        path:'chatbot',
        element:<ChatBot/>
      },
    ]
  },
  {
    path: "/access-denied",
    element: <AccessDenied />
  },
  {
    path: "/main-recruiter",
    element:  (
      <ProtectedRouterec>
        <RootLayoutRecruiter/>
      </ProtectedRouterec>
    ),
    children: [
      {
        index: true,
        element: <HomePageRecruiter />
      },
      
      {
      path:'recruiterprofile-edit',
      element:<RecruiterProfileEdit/>
      },
      {
        path: "post-jobs",
        element: <PostJobsForm />
      },
      {
        path: "view-jobs",
        element: <JobListing />
      },
      {
        path:"allcandidates",
        element:<Allcandidates/>
      },
      {
        path:'edit-job/:jobId',
        element:<EditJobForm/>
      },
      
      {
        path:'applicants/:jobId',
        element:<Applicants/>
      }
    ]
  },
  {
    path: "/access-deniedrec",
    element: < AccessDeniedrec/>
  }
]);

function App() {
  console.log(document.cookie)
  return (
    <RouterProvider router={router} />
  );
}

export default App
