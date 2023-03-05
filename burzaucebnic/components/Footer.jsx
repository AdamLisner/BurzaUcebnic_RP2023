import React from "react";
import styles from "../styles/Footer.module.css";
import { SiGithub } from "react-icons/si";

function Footer() {
  return (
    <footer className={styles.bottomnav}>
      <div className={styles.links}>
        <div className={styles.bottomNavItem}>
          <a href="https://www.gyarab.cz">Gymnázium Arabská</a>
        </div>
        <div className={styles.bottomNavItem}>
          <a href="https://github.com/gyarab">
            <SiGithub size={40} className={styles.githublogo} />
          </a>
        </div>
      </div>
      <div className={`${styles.copyRight}`}>
        <p>Adam Lisner © 2023</p>
      </div>
    </footer>
  );
}

export default Footer;
