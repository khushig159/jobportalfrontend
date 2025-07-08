import React, { useRef, useState, useEffect, useReducer } from "react";
// import "../style/SignUp.css";
import { useNavigate, Link } from "react-router-dom";
import "../style/SignUpform.css";
import styles from "../module/Signupuser.module.css";

export default function UserProfileEdit() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  //   const navigate = useNavigate();
  //   const [seekerExperiences, setSeekerExperiences] = useState({
  //     job: [],
  //     intern: [],
  //     social: [],
  //   });

  const refs = {
    phone: useRef(),
    name: useRef(),
    dob: useRef(),
    qualification: useRef(),
    course: useRef(),
    college: useRef(),
    cgpa: useRef(),
    tenthPercent: useRef(),
    tenthPassout: useRef(),
    twelfthPercent: useRef(),
    about: useRef(),
    twelvePassout: useRef(),
    graduationYear: useRef(),
    skills: useRef(),
    location: useRef(),
    currentProfession: useRef(),
    linkedin: useRef(),
    github: useRef(),
    tenthSchool: useRef(),
    twelveSchool: useRef(),
  };
  const profilephoto = useRef();
  const resumeRef = useRef();
  const skillInputRef = useRef();
  const skillsRef = useRef([]);
  const jobExperiencesRef = useRef([]);
  const internExperiencesRef = useRef([]);
  const socialExperiencesRef = useRef([]);

  //   const [_, forceUpdate] = useState(0);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0); // if you're already using this, no need to add again

  const addExperience = () => {
    jobExperiencesRef.current.push({
      title: React.createRef(),
      company: React.createRef(),
      from: React.createRef(),
      to: React.createRef(),
      responsibilities: React.createRef(),
    });
    forceUpdate();
  };

  const addInternExperience = () => {
    internExperiencesRef.current.push({
      title: React.createRef(),
      company: React.createRef(),
      from: React.createRef(),
      to: React.createRef(),
      responsibilities: React.createRef(),
    });
    forceUpdate();
  };
  const addSocialExperience = () => {
    socialExperiencesRef.current.push({
      role: React.createRef(),
      company: React.createRef(),
      from: React.createRef(),
      to: React.createRef(),
      responsibilities: React.createRef(),
    });
    forceUpdate();
  };
  useEffect(() => {
    const fetchProfile = async () => {
      // setSeekerExperiences({ job: [], intern: [], social: [] });

      jobExperiencesRef.current = [];
      internExperiencesRef.current = [];
      socialExperiencesRef.current = [];
      const response = await fetch(`${import.meta.env.VITE_API_URL}/seeker/getprofile`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      setData(data);

      refs.phone.current.value = data.seeker.phone || "";
      refs.name.current.value = data.seeker.name || "";
      refs.dob.current.value = data.seeker.dob || "";
      refs.qualification.current.value = data.seeker.qualification || "";
      refs.course.current.value = data.seeker.course || "";
      refs.college.current.value = data.seeker.college || "";
      refs.cgpa.current.value = data.seeker.cgpa || "";
      refs.tenthPercent.current.value = data.seeker.tenthPercent || "";
      refs.tenthPassout.current.value = data.seeker.tenthPassout || "";
      refs.tenthSchool.current.value = data.seeker.tenthSchool || "";
      refs.twelveSchool.current.value = data.seeker.twelveSchool || "";
      refs.twelvePassout.current.value = data.seeker.twelvePassout || "";
      refs.graduationYear.current.value = data.seeker.graduationYear || "";
      refs.location.current.value = data.seeker.location || "";
      refs.twelfthPercent.current.value = data.seeker.twelfthPercent || "";
      refs.currentProfession.current.value =
        data.seeker.currentProfession || "";
      refs.about.current.value = data.seeker.about || "";
      refs.linkedin.current.value = data.seeker.linkedin || "";
      refs.github.current.value = data.seeker.github || "";

      console.log(jobExperiencesRef);

      // skillsRef.current = data.seeker.skills || [];
      skillsRef.current = [...(data.seeker.skills || [])];

      if (data && data.seeker?.jobExperiences) {
        jobExperiencesRef.current = []; // Clear existing refs first

        (data.seeker.jobExperiences || []).forEach(() => {
          jobExperiencesRef.current.push({
            title: React.createRef(),
            company: React.createRef(),
            from: React.createRef(),
            to: React.createRef(),
            responsibilities: React.createRef(),
          });
        });

        forceUpdate((n) => n + 1); // Trigger rerender
      }

      if (data && data.seeker?.internExperiences) {
        internExperiencesRef.current = []; // Clear existing refs first

        (data.seeker.internExperiences || []).forEach(() => {
          internExperiencesRef.current.push({
            title: React.createRef(),
            company: React.createRef(),
            from: React.createRef(),
            to: React.createRef(),
            responsibilities: React.createRef(),
          });
        });

        forceUpdate((n) => n + 1); // Trigger rerender
      }

      // Social Experiences
      if (data && data.seeker?.socialExperiences) {
        socialExperiencesRef.current = []; // Clear existing refs first

        (data.seeker.socialExperiences || []).forEach(() => {
          socialExperiencesRef.current.push({
            role: React.createRef(),
            company: React.createRef(),
            from: React.createRef(),
            to: React.createRef(),
            responsibilities: React.createRef(),
          });
        });

        forceUpdate((n) => n + 1); // Trigger rerender
      }
      console.log(jobExperiencesRef);

      // forceUpdate((n) => n + 1); // trigger rerender
      forceUpdate();
    };
    fetchProfile();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Personal and educational refs
    Object.keys(refs).forEach((key) => {
      const value = refs[key].current?.value;
      if (value !== undefined) formData.append(key, value);
    });

    // Skills
    formData.append("skills", JSON.stringify(skillsRef.current));

    // Job Experiences
    const jobExperiences = jobExperiencesRef.current.map((exp) => ({
      title: exp.title.current?.value,
      company: exp.company.current?.value,
      from: exp.from.current?.value,
      to: exp.to.current?.value,
      responsibilities: exp.responsibilities.current?.value,
    }));
    formData.append("jobExperiences", JSON.stringify(jobExperiences));

    // Intern Experiences
    const internExperiences = internExperiencesRef.current.map((exp) => ({
      title: exp.title.current?.value,
      company: exp.company.current?.value,
      from: exp.from.current?.value,
      to: exp.to.current?.value,
      responsibilities: exp.responsibilities.current?.value,
    }));
    formData.append("internExperiences", JSON.stringify(internExperiences));

    // Social Experiences
    const socialExperiences = socialExperiencesRef.current.map((exp) => ({
      role: exp.role.current?.value,
      company: exp.company.current?.value,
      from: exp.from.current?.value,
      to: exp.to.current?.value,
      responsibilities: exp.responsibilities.current?.value,
    }));
    formData.append("socialExperiences", JSON.stringify(socialExperiences));

    // Resume
    if (resumeRef.current?.files?.[0]) {
      formData.append("resume", resumeRef.current.files[0]);
    }

    // Profile Photo
    if (profilephoto.current?.files?.[0]) {
      formData.append("profilePhoto", profilephoto.current.files[0]);
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/seeker/editProfile`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        // console.log("Profile updated successfully!");
        navigate("/main/userprofile");
      }
      if (response.status === "404") {
        console.log("login first");
      } else {
        console.error(result.message || "Failed to update profile.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.container3}>
        <div className={styles.rightpanel}>
          <h3>Craft a Profile That Gets You Noticed</h3>
          <p>Updating your profile helps us find what fits you best.</p>
          <form onSubmit={handleSubmit} className={styles.signupform}>
            <h3 className="personal">Personal Details</h3>
            <div className={styles.namefields}>
              <div className={styles.inputgroup}>
                <label>Full Name</label>
                <input ref={refs.name} type="text" />
              </div>
              <div className={styles.inputgroup}>
                <label>Date of Birth</label>
                <input ref={refs.dob} type="date" />
              </div>
              <div className={styles.inputgroup}>
                <label>location</label>
                <input ref={refs.location} type="text" />
              </div>
            </div>
            <div className={styles.namefields}>
              <div className={styles.inputgroup}>
                <label>Phone Number</label>
                <input ref={refs.phone} type="text" />
              </div>
              <div className={styles.inputgroup}>
                <label>Current Profession</label>
                <input ref={refs.currentProfession} type="text" />
              </div>
              <div className={styles.inputgroup}>
                <label>About you</label>
                <input ref={refs.about} type="text" />
              </div>
            </div>
           
            <h3>Educational Details</h3>
            <div className={styles.namefields}>
              <div className={styles.inputgroup}>
                <label>Highest Qualification</label>
                <input ref={refs.qualification} type="text" />
              </div>
              <div className={styles.inputgroup}>
                <label>Current Course Name</label>
                <input ref={refs.course} type="text" />
              </div>
              <div className={styles.inputgroup}>
                <label>College Name</label>
                <input ref={refs.college} type="text" />
              </div>
            </div>
            <div className={styles.namefields}>
              <div className={styles.inputgroup}>
                <label>10th School Name</label>
                <input ref={refs.tenthSchool} type="text" />
              </div>
              <div className={styles.inputgroup}>
                <label>10th Percentage</label>
                <input ref={refs.tenthPercent} type="number" step="0.01" />
              </div>
              <div className={styles.inputgroup}>
                <label>Pass out Year</label>
                <input ref={refs.tenthPassout} type="number" />
              </div>
            </div>
            <div className={styles.namefields}>
              <div className={styles.inputgroup}>
                <label>12th School Name</label>
                <input ref={refs.twelveSchool} type="text" />
              </div>
              <div className={styles.inputgroup}>
                <label>12th Percentage</label>
                <input ref={refs.twelfthPercent} type="number" />
              </div>
              <div className={styles.inputgroup}>
                <label>Passout Year</label>
                <input ref={refs.twelvePassout} type="number" />
              </div>
            </div>
            <div className={styles.namefields}>
              <div className={styles.inputgroup}>
                <label>cgpa</label>
                <input ref={refs.cgpa} type="number" />
              </div>
              <div className={styles.inputgroup}>
                <label>Graduation Year</label>
                <input ref={refs.graduationYear} type="text" />
              </div>
            </div>
            <h3>Skills</h3>
            <div className={styles.flex}>
              <div className={styles.inputgroup}>
                <label>Add Skill</label>
                <input
                  type="text"
                  ref={skillInputRef}
                  placeholder="e.g. React, Python"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const value = skillInputRef.current.value.trim();
                  if (value !== "") {
                    skillsRef.current.push(value);
                    skillInputRef.current.value = "";
                    forceUpdate((n) => n + 1);
                  }
                }}
              >
                Add
              </button>
            </div>
            <div className="skill-tags">
              {skillsRef.current.map((skill, index) => (
                <span key={index} className="skill-tag">
                  <h5>{skill}</h5>
                  <button className={styles.skillbutton}
                    type="button"
                    onClick={() => {
                      skillsRef.current = skillsRef.current.filter(
                        (_, i) => i !== index
                      );
                      forceUpdate((n) => n + 1);
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <h3>Professional Details</h3>
            <div className="one1">
              <h3 className={styles.namme}>Job Experiences</h3>
              <button type="button" className="add" onClick={addExperience}>
                +
              </button>
            </div>
            {jobExperiencesRef.current.map((job, i) => (
              <div key={i}>
                <h4>Job Experience {i + 1}</h4>
                <div className={styles.namefields2}>
                <div className={styles.inputgroup}>
                <label>Job Title</label>
                    <input
                      ref={job.title}
                      defaultValue={data.seeker.jobExperiences[i]?.title}
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <label>Company</label>
                    <input
                      ref={job.company}
                      defaultValue={data.seeker.jobExperiences[i]?.company}
                    />
                  </div></div>
                  <div className={styles.namefields2}>
                  <div className={styles.inputgroup}>
                      <label>From</label>
                      <input
                        ref={job.from}
                        type="date"
                        defaultValue={data.seeker.jobExperiences[i]?.from}
                      />
                    </div>
                    <div className={styles.inputgroup}>
                    <label>To</label>
                      <input
                        ref={job.to}
                        type="date"
                        defaultValue={data.seeker.jobExperiences[i]?.to}
                      />
                    </div>
                  </div>{" "}
                
              </div>
            ))}
            <div className="one1">
              <h3  className={styles.namme}>Internship Experiences</h3>
              <button
                type="button"
                className="add"
                onClick={addInternExperience}
              >
                +
              </button>
            </div>
            {internExperiencesRef.current.map((job, i) => (
              <div key={i}>
                <h4>Internship Experience {i + 1}</h4>
                <div className={styles.namefields2}>
                <div className={styles.inputgroup}>
                <label>Job Title</label>
                    <input
                      ref={job.title}
                      defaultValue={data.seeker.internExperiences[i]?.title}
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <label>Company</label>
                    <input
                      ref={job.company}
                      defaultValue={data.seeker.internExperiences[i]?.company}
                    />
                  </div></div>
                  <div className={styles.namefields2}>
                  <div className={styles.inputgroup}>
                      <label>From</label>
                      <input
                        ref={job.from}
                        type="date"
                        defaultValue={data.seeker.internExperiences[i]?.from}
                      />
                    </div>
                    <div className={styles.inputgroup}>
                    <label>To</label>
                      <input
                        ref={job.to}
                        type="date"
                        defaultValue={data.seeker.internExperiences[i]?.to}
                      />
                    </div>
                  </div>{" "}

               
              </div>
            ))}
            <div className="one1">
              <h3  className={styles.namme}>Social Work/ExtraCurricular Experiences</h3>
              <button
                type="button"
                className="add"
                onClick={addSocialExperience}
              >
                +
              </button>
            </div>
            {socialExperiencesRef.current.map((job, i) => (
              <div key={i}>
                <h4>Social Work/ExtraCurricular Experience {i + 1}</h4>
                <div className={styles.namefields2}>
                  <div className={styles.inputgroup}>
                    <label>Role Title</label>
                    <input
                      ref={job.role}
                      defaultValue={data.seeker.socialExperiences[i]?.title}
                    />
                  </div>
                  <div className={styles.inputgroup}>
                    <label>Company</label>
                    <input
                      ref={job.company}
                      defaultValue={data.seeker.socialExperiences[i]?.company}
                    />
                  </div>
             </div>
                  
                  <div  className={styles.namefields2}>
                    <div className={styles.inputgroup}>
                      <label>From</label>
                      <input
                        ref={job.from}
                        type="date"
                        defaultValue={data.seeker.socialExperiences[i]?.from}
                      />
                    </div>
                    <div className={styles.inputgroup}>
                      <label>To</label>
                      <input
                        ref={job.to}
                        type="date"
                        defaultValue={data.seeker.socialExperiences[i]?.to}
                      />
                    </div>
                  </div>{" "}

                
              </div>
            ))}

            <div className={styles.namefields2}>
              <div className={styles.inputgroup}>
                <label>LinkedIn Url</label>
                <input type="text" ref={refs.linkedin} />
              </div>

              <div className={styles.inputgroup}>
                <label>Github/PortFolio</label>
                <input type="text" ref={refs.github} />
              </div>
            </div>
            <div className={styles.namefields2}>
            <div className={styles.fileupload}>
            <label>Upload Resume</label>
                <label htmlFor="resumeUpload" className={styles.customfileupload}>
                  Choose File
                </label>
                <input
                  id="resumeUpload"
                  type="file"
                  ref={resumeRef}
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className={styles.fileupload}>
                <label>Upload Profile Photo</label>
                <label htmlFor="profileupload" className={styles.customfileupload}>
                  Choose File
                </label>
                <input
                  id="profileupload"
                  type="file"
                  ref={profilephoto}
                  accept=".jpg, .jpeg, .png"
                />
              </div>
            </div>
            <br/>
            <br/>
            <button className='final-button' type="submit">Update My Profile</button>
          </form>
        </div>
      </div>
    </>
  );
}
