import React from "react";
import styles from "../module/Filters.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Filters() {
  return (
    <aside className={styles.filters}>
      <div>
        <h3>
          Filters{" "}
          <button>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </h3>
        <label>Job Category</label>
        <select>
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
        <select>
          <option>Full-time</option>
          <option>Half-time</option>
          <option>Internship</option>
        </select>
      </div>
      <div>
        <label>Experince Level</label>
        <select>
          <option value="fresher">Fresher</option>
          <option value="0-1">0 - 1 year</option>
          <option value="1-3">1 - 3 years</option>
          <option value="3-5">3 - 5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>
      <div>
        <label>Work Mode</label>
        <select>
          <option value="onsite">Onsite</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div>
        <label>Salary Range</label>
        <select>
          <option value="<1">less than ₹1 LPA</option>
          <option value="1-2">₹1 - ₹2 LPA</option>
          <option value="2-3">₹2 - ₹3 LPA</option>
          <option value="3-4">₹3 - ₹4 LPA</option>
          <option value="4-5">₹4 - ₹5 LPA</option>
          <option value="5-6">₹5 - ₹6 LPA</option>
          <option value="6-7">₹6 - ₹7 LPA</option>
          <option value="7-8">₹7 - ₹8 LPA</option>
          <option value="8-9">₹8 - ₹9 LPA</option>
          <option value="9-10">₹9 - ₹10 LPA</option>
          <option value="10-12">₹10 - ₹12 LPA</option>
          <option value="12-15">₹12 - ₹15 LPA</option>
          <option value="15+">₹15+ LPA</option>
        </select>
      </div>
        <button
       
        >
          Apply
        </button>
    </aside>
  );
}
