import { useState, useEffect } from "react";
import styles from "../styles/create.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardHeader, CardBody } from "reactstrap";
export default function create() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        {/* <div>Create New Item</div> */}
        <form action="/api/form" method="post">
          <label htmlFor="first">First Name</label>
          <input type="text" id="first" name="first" required />

          <label htmlFor="last">Last Name</label>
          <input type="text" id="last" name="last" required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
