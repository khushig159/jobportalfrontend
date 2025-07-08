import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import cityImg from '../assets/city.jpg';
// import heroImg from '../assets/hero.png';
import "../style/StartPage.css";
import logoImage from "../assets/logo.jpg";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing-hero">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img src={logoImage} alt="" />
          <h1>
            Discover , Apply and Get Hired <br />
           
          </h1>
          <p className="para-span">
              all in one place
            </p>
          <p className="des-span">
            Workora streamlines hiring and job searching
          </p>
          <div className="start-button">
            <button
              className="cta-btn"
              onClick={() => navigate("/user-signup")}
            >
              Explore Jobs
            </button>
            <button
              className="cta-btn"
              onClick={() => navigate("/recruiter-signup")}
            >
              Hire Talents
            </button>
          </div>
        </motion.div>
      </div>

      {/* <div className="frontPage">
      <header id="welcome-header">
        <motion.div id="welcome-header-content"
        style={{scale:scaleText ,y:ytext}}>
          <h1>KickStart Your Career with Workora</h1>
        </motion.div>
        <motion.img
          style={{opacity:opacityCity, y:yCIty}}
          src={cityImg}
          alt="A city skyline touched by sunlight"
          id="city-image"
        />
        <motion.img 
        style={{y:yHero, opacity:opacityHero}}
        src={heroImg} 
        alt="A superhero wearing a cape" 
        id="hero-image" />
      </header>
      <main id="welcome-content">
  <motion.section style={{opacity:opacitytext2}}>
    <h2>Your Dream Job Is Just a Click Away</h2>
    <p>
      With Workora, you can discover tailored job opportunities, connect with top companies, and track your career progress effortlessly. Whether you're just starting out or aiming higher, we've got the tools to help you succeed.
    </p>
  </motion.section>

  <motion.section style={{opacity:opacitytext4}}>
    <h2>Why Choose Workora?</h2>
    <p>
      The job market is evolving, and so should your approach. Workora empowers you with smart tools, real-time insights, and a support system that puts your growth first. It's more than a job search—it's a career journey.
    </p>
  </motion.section>

  <motion.section style={{opacity:opacitytext3}}>
    <h2>Key Features</h2>
    <ul>
      <li>
        <strong>Personalized Job Matching:</strong> Get job recommendations based on your skills, preferences, and goals.
      </li>
      <li>
        <strong>Application Tracker:</strong> Manage all your job applications in one place and stay updated on every step.
      </li>
      <li>
        <strong>Verified Recruiter Network:</strong> Connect with genuine employers actively hiring for quality roles.
      </li>
      <li>
        <strong>Career Resources:</strong> Access resume tips, interview guides, and mentorship from industry experts.
      </li>
    </ul>
  </motion.section>

  <motion.section style={{opacity:opacitytext5}}>
    <h2>What Our Users Say</h2>
    <p>
      “I landed my first job through Workora within a month of graduating. The platform is user-friendly, and the support was amazing!” – Priya S.
    </p>
    {/* You can add more testimonials or even a carousel for multiple testimonials */}
      {/* </motion.section>
</main>
 <div className="buttonsstart">
        <button onClick={()=>navigate("/user-signup")}>Looking for Job Opportunities?</button>
        <button onClick={()=>navigate("/recruiter-signup")}>Looking for dedicated Employees?</button>
    </div></div> */}
    </>
  );
}
