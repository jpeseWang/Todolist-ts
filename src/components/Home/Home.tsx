/* eslint-disable @typescript-eslint/space-before-function-paren */
import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import logo from "../../assets/images/homelogo.png";
import "../../styles/Button.css";

export function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <h1>Manage your daily tasks better</h1>
        <img src={logo}></img>
        <p className={styles["description-text"]}>
          Checklists with Superpowers! Get the right things done, by the right
          people, in the right order, and at the right time. Most of us humans
          forget things and make mistakes Checklists can help fix that.
        </p>
        <button className="btn-start btn-group">
          <Link to="/feature">Start now</Link>
        </button>
      </div>
      <Outlet />
    </div>
  );
}
