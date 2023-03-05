import React from "react";
import styles from "../styles/FloatingButton.module.css";
import { useRouter } from "next/router";

const FloatingButton = () => {
  const router = useRouter();

  const redirect = () => {
    router.push("/addProduct");
  };
  return (
    <div className={styles.container}>
      <button onClick={redirect} className={styles.floatingButton}>
        +
      </button>
    </div>
  );
};

export default FloatingButton;
