// RootLayout.js
import React, {  } from 'react';
import { Outlet } from 'react-router-dom';
import '../style/RootLayout.css'
import Sidebar from './Sidebar';

export default function RootLayout() {
  // const [showChatbot, setShowChatbot] = useState(false);

  return (
    // <div>
    //   {showChatbot ? (
    //     <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot}/>
    //   ) : (
    //     <>
    //       <MainNavigation showChatbot={showChatbot} setShowChatbot={setShowChatbot}/>
    //       <Outlet />
    //     </>
    //   )}
    // </div>  
    <div className='root-layout'>
      <Sidebar />
      <div className="main-content2">
        <Outlet />
      </div>
    </div>
  );
}
