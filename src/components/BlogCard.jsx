import React from 'react'
import '../style/HomePage.css'
export default function BlogCard({ img,title,des,link}) {
  return (
    <div className='blogcard'>
     <div className='imgclass'>
     <img src={img} alt="Blog" />
     </div>
        <div className='textblog'>
        <h2>{title}</h2>
        <p>{des}</p>
        <button onClick={() => window.location.href = link}>Read More</button>
        </div>
    </div>
  )
}
