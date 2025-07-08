// Spinner.js
import React from "react";
import styles from "../module/Filters.module.css"; // Import the CSS

const Spinner = () => {
    return (
        <div className={styles.container}>
          <div className={styles.loader}></div>
        </div>
  );
};

export default Spinner;
