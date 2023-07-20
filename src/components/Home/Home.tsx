import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import logo from "../../assets/images/homelogo.png";
import classnames from 'classnames';
import { Button } from "../Button/Button";
import btn from "../../components/Button/Button.module.css";
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
        <Button className={classnames(btn["btn-start"], btn["btn-group"])}>
          <Link to="/feature">Start now</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}
