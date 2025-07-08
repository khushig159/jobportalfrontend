import React, { useState, useEffect, useRef } from "react";
import styles from "../module/JobBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobCard from "../components/JobCard";
import PerformJobAction from "../../UI/util";
import {
  faMagnifyingGlass,
  faRightFromBracket,
  faSliders,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import Jobdetails from "../components/Jobdetails";
import Spinner from "../components/Loading";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [detailshow, setdetailshow] = useState(false);
  const [jobId, setJobId] = useState("");
  const [show, setshow] = useState(false);
  const [greet, setgreet] = useState("Hello");
  const [jobs, setjobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedjobs, setAppliedjobs] = useState([]);
  const [name, setname] = useState("");

  const searchref = useRef();
  const locationRef = useRef();
  const jobTypeRef = useRef();
  const experienceLevelRef = useRef();
  const industryRef = useRef();
  const salaryRangeRef = useRef();
  const companysize = useRef();

  function getDaysAgo(createdAt) {
    const createdDate = new Date(createdAt);
    const today = new Date();

    // Get the difference in milliseconds
    const diffInMs = today - createdDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }
  function getPostedText(createdAt) {
    const days = getDaysAgo(createdAt);
    if (days === 0) return "Posted today";
    if (days === 1) return "Posted yesterday";
    return `Posted ${days} days ago`;
  }

  function showFilter() {
    setshow((prevState) => !prevState);
  }
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setgreet("Good Morning");
    } else if (currentHour < 17) {
      setgreet("Good Afternoon");
    } else {
      setgreet("Good Evening");
    }
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/seeker/getname`, {
          credentials: "include",
        });
        const data = await res.json();
        setname(data.name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchName();
  }, []);
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/seeker/getjobs`, {
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        if (response.status === 403) {
          throw new Error(
            "You are not authorized to view posted jobs. Please login as a recruiter."
          );
        }

        console.log("Jobs fetched successfully:", data.jobs);

        const validJobs = data.jobs.filter(
          (job) => new Date(job.applicationDeadline) >= new Date()
        );
  
        setjobs(validJobs);
        setFilteredJobs(validJobs);
      } catch (err) {
        console.log(err);
        setjobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
    
  }, []);



  useEffect(() => {
    const fetchsavedJobs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/seeker/savedJobs`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          console.log("failed to fetch jobs");
        }
        if (response.status === 404) {
          console.log("Login to continue");
        }
        if (response.status === 200) {
          console.log("job fetched");
        }
        console.log(data.jobs);
        setSavedJobs(data.jobs.map((job) => job._id)); // ✅ only store IDs here
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchsavedJobs();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/seeker/appliedJobs`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          console.log("failed to fetch jobs");
        }
        if (response.status === 404) {
          console.log("Login to continue");
        }
        if (response.status === 200) {
          console.log("job fetched");
        }
        console.log(data.jobs);
        setAppliedjobs(data.jobs.map((job) => job._id));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchJobs();
  }, []);

  const handleSUbmit = (e) => {
    e.preventDefault();

    console.log({
      location: locationRef.current?.value,
      jobType: jobTypeRef.current?.value,
      experienceLevel: experienceLevelRef.current?.value,
      industry: industryRef.current?.value,
      salaryRange: salaryRangeRef.current?.value,
      companySize: companysize.current?.value,
      keyword: searchref.current?.value,
    });

    const location = locationRef.current?.value?.toLowerCase() || "";
    const jobType = jobTypeRef.current?.value?.toLowerCase() || "";
    const experienceLevel =
      experienceLevelRef.current?.value?.toLowerCase() || "";
    const industry = industryRef.current?.value?.toLowerCase() || "";
    const salaryRange = salaryRangeRef.current?.value?.toLowerCase() || "";
    const size = companysize.current?.value?.toLowerCase() || "";
    const keyword = searchref.current?.value?.toLowerCase() || "";

    const filtered = jobs.filter((job) => {
      const titleMatch = job.jobTitle?.toLowerCase().includes(keyword);
      const companyMatch = job.postedBy?.name.toLowerCase().includes(keyword);
      const jobTypeMatch = job.jobType?.toLowerCase().includes(keyword);
      const locationMatch = job.location?.toLowerCase().includes(keyword);
      const placeMatch = job.place?.toLowerCase().includes(keyword);
      const industryMatch = job.industry?.toLowerCase().includes(keyword);
      const requirementsMatch = job.requirements
        ?.toLowerCase()
        .includes(keyword);
      const experienceMatch = job.experienceLevel
        ?.toLowerCase()
        .includes(keyword);
      const companySizeMatch = job.postedBy.companysize
        ?.toLowerCase()
        .includes(keyword);

      const keywordMatch =
        keyword === "" ||
        placeMatch ||
        titleMatch ||
        companyMatch ||
        jobTypeMatch ||
        locationMatch ||
        industryMatch ||
        requirementsMatch ||
        experienceMatch ||
        companySizeMatch;

      const otherFiltersMatch =
        (location === "" || job.place?.toLowerCase() === location) &&
        (jobType === "" || job.jobType?.toLowerCase() === jobType) &&
        (experienceLevel === "" ||
          job.experienceLevel?.toLowerCase() === experienceLevel) &&
        (industry === "" || job.industry?.toLowerCase() === industry) &&
        (size === "" ||
          job.postedBy.companysize?.toLowerCase().trim() === size.trim());
      let salaryMatch = true;
      if (salaryRange !== "" && job.salaryRange) {
        const [minFilter, maxFilter] = salaryRange.split("-").map(Number);
        const [minJob, maxJob] = job.salaryRange.split("-").map(Number);
        salaryMatch = minJob >= minFilter && maxJob <= maxFilter;
      }

      return otherFiltersMatch && keywordMatch && salaryMatch;
    });

    console.log("Filters applied");

    setFilteredJobs(filtered);
    locationRef.current.value = "";
    jobTypeRef.current.value = "";
    experienceLevelRef.current.value = "";
    industryRef.current.value = "";
    salaryRangeRef.current.value = "";
    companysize.current.value = "";
    console.log(filteredJobs);
  };
  const handleClear = () => {
    locationRef.current.value = "";
    jobTypeRef.current.value = "";
    experienceLevelRef.current.value = "";
    industryRef.current.value = "";
    salaryRangeRef.current.value = "";
    companysize.current.value = "";
    // setFilteredJobs(jobs)
  };

  let displayjobs = jobs;

  if (filteredJobs.length === 0) {
    displayjobs = jobs;
  } else {
    displayjobs = filteredJobs;
  }

  console.log(filteredJobs);
  console.log(displayjobs);

  const handleunsave = async (jobId) => {
    await PerformJobAction({
      url: `${import.meta.env.VITE_API_URL}/seeker/unsavejob/${jobId}`,
      method: "DELETE",
      successCallback: () => {
        // alert("Job unsaved successfully");
        setSavedJobs((prev) => prev.filter((id) => id !== jobId)); // remove jobId from saved list
      }, // updateStateCallback: setsavedJobs,
      // jobId,
    });
  };
  const handleSave = async (jobId) => {
    await PerformJobAction({
      url: `${import.meta.env.VITE_API_URL}/seeker/saveJob/${jobId}`,
      method: "POST",
      successCallback: () => {
        // alert("Job saved successfully");
        setSavedJobs((prev) => [...prev, jobId]); // add jobId to saved list
      },
    });
  };

  const handleApply = async (jobId) => {
    await PerformJobAction({
      url: `${import.meta.env.VITE_API_URL}/seeker/applyjob/${jobId}`,
      method: "POST",
      successCallback: () => {
        console.log("Applied to job successfully");
        setAppliedjobs((prev) => [...prev, jobId]); // add jobId to saved list
      },
    });
  };
  console.log(savedJobs.map((job) => job._id));
  // const savedJobIds = useMemo(
  //   () => savedJobs.map((job) => job._id),
  //   [savedJobs]
  // );
  const savedJobIds = savedJobs; // ✅ already job IDs
  const appliedJobIds = appliedjobs;

  // const displayJobs = filteredJobs.length > 0 ? filteredJobs : jobs;
  // console.log(displayJobs);

  function handleDetails(jobId) {
    // navigate(`/main/jobdetail/${jobId}`)
    setdetailshow(true);
    setJobId(jobId);
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.suppercontainer}>
          <div className={styles.container}>
            <div className={styles.innercontainer}>
              <div className={styles.upperbar}>
                <div className={styles.upper}>
                  <h2>
                    {greet}, {name} !
                  </h2>
                  <p>Check your curated job board</p>
                </div>
                <div className={styles.upperbarinner}>
                  <div className={styles.searchbox}>
                    <span className={styles.searchicon}>
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faMagnifyingGlass}
                      />
                    </span>
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      ref={searchref}
                    />
                    <button onClick={handleSUbmit}>go</button>
                  </div>
                  <button onClick={showFilter}>
                    {show ? (
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className={styles.icon6}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSliders}
                        className={styles.icon6}
                      />
                    )}
                  </button>
                </div>
              </div>

              <main className={styles.main}>
                {filteredJobs.length === 0 ? (
                  <>
                    <p className={styles.filterno}>
                      Oops! Looks like no jobs match your filters. Try adjusting
                      them!
                    </p>
                    <div className={styles.jobs}>
                      {displayjobs.map((job) => (
                        <JobCard
                          key={job._id}
                          job={job}
                          savedJobIds={savedJobIds}
                          appliedJobIds={appliedJobIds}
                          handleSave={handleSave}
                          handleunsave={handleunsave}
                          handleApply={handleApply}
                          handleDetails={handleDetails}
                          getPostedText={getPostedText}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={styles.jobs}>
                    {displayjobs.map((job) => (
                      <JobCard
                        key={job._id}
                        job={job}
                        savedJobIds={savedJobIds}
                        appliedJobIds={appliedJobIds}
                        handleSave={handleSave}
                        handleunsave={handleunsave}
                        handleApply={handleApply}
                        handleDetails={handleDetails}
                        getPostedText={getPostedText}
                      />
                    ))}
                  </div>
                )}
              </main>
            </div>
          </div>
          <aside className={`${styles.filters} ${!show ? styles.hide : ""}`}>
            <button
              className={styles.showfilter}
              style={{
                outline: "none",
                border: "none",
                background: "transparent",
                color: "#888",
              }}
              onClick={showFilter}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className={styles.icon6}
              />
            </button>
            <form onSubmit={handleSUbmit}>
              <div>
                <h3>
                  Filters{" "}
                  <FontAwesomeIcon
                    onClick={handleClear}
                    className={styles.icon7}
                    icon={faEraser}
                  />
                </h3>
                <label>Job Category</label>
                <select ref={industryRef}>
                  <option value="" >
                    Category
                  </option>
                  <option>Technology</option>
                  <option>HealthCare</option>
                  <option>Design</option>
                  <option>Finance</option>
                  <option>Business</option>
                  <option>Sales</option>
                  <option>Law</option>
                  <option>IT</option>
                  <option>Consultant</option>
                  <option>other</option>
                </select>
              </div>
              <div>
                <label>Job Type</label>
                <select ref={jobTypeRef}>
                  <option value="" >
                    Type
                  </option>
                  <option>Full-time</option>
                  <option>Half-time</option>
                  <option>Internship</option>
                </select>
              </div>
              <div>
                <label>Experince Level</label>
                <select ref={experienceLevelRef}>
                  <option value="" >
                    Experience
                  </option>
                  <option value="Fresher">Fresher</option>
                  <option value="0-1">0 - 1 year</option>
                  <option value="1-3">1 - 3 years</option>
                  <option value="3-5">3 - 5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
              <div>
                <label>Work Mode</label>
                <select ref={locationRef}>
                  <option value="" >
                    Mode
                  </option>
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label>Company Size</label>
                <select ref={companysize} id="companysize" defaultValue="">
                  <option value="" >
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
              <div>
                <label>Salary Range</label>
                <select ref={salaryRangeRef}>
                  <option value="" >
                    Min-Max
                  </option>
                  <option value="1-2 LPA">1 - 2 LPA</option>
                  <option value="2-3 LPA">2 - 3 LPA</option>
                  <option value="3-4 LPA">3 - 4 LPA</option>
                  <option value="4-5 LPA">4 - 5 LPA</option>
                  <option value="5-6 LPA">5 - 6 LPA</option>
                  <option value="6-7 LPA">6 - 7 LPA</option>
                  <option value="7-8 LPA">7 - 8 LPA</option>
                  <option value="8-9 LPA">8 - 9 LPA</option>
                  <option value="9-10 LPA">9 - 10 LPA</option>
                  <option value="10-12 LPA">10 - 12 LPA</option>
                  <option value="12-15 LPA">12 - 15 LPA</option>
                  <option value="15+ LPA">15+ LPA</option>
                </select>
              </div>

              <button type="submit">Apply</button>
            </form>
          </aside>
        </div>
      )}
      <Jobdetails
        show={detailshow}
        jobid={jobId}
        onClose={() => setdetailshow(false)}
      />
    </>
  );
}
