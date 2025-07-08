import React, { useRef, useEffect ,useState} from "react";
import "../style/SignUp.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/SignUpform.css";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export default function RecruiterProfileEdit() {
  const [message, setmessage] = useState([]);
  const navigate = useNavigate();
  const refs = {
    CompanyWebsite: useRef(),
    companyLogo: useRef(),
    linkedIn: useRef(),
    companyDescription: useRef(),
    name: useRef(),
    companyLocation: useRef(),
    industry: useRef(),
    companysize: useRef(),
  };
  const addmessage = (message) => {
    setmessage((prev) => [...prev, message]);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/recruiter/getprofile`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        console.log(data.recruiter);
        refs.name.current.value = data.recruiter.name || "";
        refs.companyLocation.current.value =
          data.recruiter.companyLocation || "";
        refs.CompanyWebsite.current.value = data.recruiter.companyWebsite || "";
        refs.linkedIn.current.value = data.recruiter.linkedIn || "";
        refs.companyDescription.current.value =
          data.recruiter.companyDescription || "";
        refs.industry.current.value = data.recruiter.industry || "";
        refs.companysize.current.value = data.recruiter.companysize || "";

        if (response.status === 404) {
          throw new Error("You need to login before accessing your profile");
        }
      } catch (err) {
        console.log(err.message);
        // alert(err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyLogoFile = refs.companyLogo.current.files[0];
    const companyWebsite = refs.CompanyWebsite.current.value.trim();
    const linkedIn = refs.linkedIn.current.value.trim();
    const companyDescription = refs.companyDescription.current.value.trim();
    const name = refs.name.current.value.trim();
    const industry = refs.industry.current.value.trim();
    const comapanysize = refs.companysize.current.value.trim();
    const companyLocation = refs.companyLocation.current.value.trim();

    if (companyLogoFile?.size > 2 * 1024 * 1024) {
      addmessage("Company logo must be less than 2MB.");
      return;
    }

    // if (!companyLogoFile.type.match("image.*")) {
    //   alert("Company logo must be an image file.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("companyWebsite", companyWebsite);
    formData.append("linkedIn", linkedIn);
    formData.append("companyDescription", companyDescription);
    formData.append("companyLogo", companyLogoFile); // Must match backend field name
    formData.append("companyLocation", companyLocation);
    formData.append("companysize", comapanysize);
    formData.append("industry", industry);
    formData.append("name", name);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recruiter/editprofile`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Response Data:", data);
      if (!response.ok) {
        addmessage("Failed to submit profile, try again later");
      }
      if (response.status === 403) {
        console.log(
          "You are not authorized to submit a profile, please login as a recruiter"
        );
      }
      if (response.status === 404) {
        console.log(
          "Recruiter not found, please login to complete your profile"
        );
      }
      if (response.status === 200) {
        // alert("Profile updated successfully!");
        navigate("/main-recruiter/recruiterprofile");
      }
      console.log("Response Data:", data.recruiter);
      navigate("/main-recruiter");
    } catch (error) {
      console.error("Error:", error.message);
      console.log(error.message);
    }

    //Example: navigate("/success");
  };

  return (
    <>
      <div className="container3">
        <div className="right-panel2">
          <h3>Refine Your Hiring Identity</h3>
          <p>
            Keep your profile up to date to attract the right candidates faster.
            .
          </p>
          <form onSubmit={handleSubmit} className="signup-form">
            <h3 className="personal"></h3>
            <div className="name-field2">
              <div className="input-group">
                <label>Company Name</label>
                <input ref={refs.name} type="text" />
              </div>
              <div className="input-group">
                <label>Company Location</label>
                <input ref={refs.companyLocation} type="text" />
              </div>
            </div>
            <div className="name-fields">
              <div className="input-group">
                <label>Industry</label>
                <input ref={refs.industry} type="text" />
              </div>
              <div className="input-group10">
                <label htmlFor="companysize">Company Size</label>
                <select ref={refs.companysize} id="companysize" defaultValue="">
                  <option value="" disabled>
                    Select company size
                  </option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-500">201–500</option>
                  <option value="501-1000">501–1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
            </div>

            <div className="name-fields">
              <div className="input-group">
                <label>Company Website</label>
                <input ref={refs.CompanyWebsite} type="text" />
              </div>
              <div className="input-group">
                <label>LinkedIn Url</label>
                <input ref={refs.linkedIn} type="text" />
              </div>
            </div>
              <div className="input-group">
                <label>Company Description</label>
                <textarea ref={refs.companyDescription} type="text" />
              </div>
              <div className="file-upload">
                <label>Upload Company Logo</label>
                <label htmlFor="resumeUpload" className="custom-file-upload2">
                  Choose File
                </label>
                <input
                  id="resumeUpload"
                  type="file"
                  ref={refs.companyLogo}
                  accept=".png,.jpg,.jpeg"
                />
              </div>
            <br />
            {message.map((message) => (
              <p style={{ margin: "0px", color: "red" }}>
                <FontAwesomeIcon icon={faExclamation} /> {message}
              </p>
            ))}

            <button className="final-button" type="submit">
              Update My Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
