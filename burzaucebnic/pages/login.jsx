import React from "react";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
/**
 * 
 * @returns {ReactComponentElement}
 */
const login = () => {
  const { data: session, status } = useSession();
  //console.log(data);

  if (status === "authenticated") {
    console.log(session);
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <img src={session.user.image} alt="" style={{ borderRadius: "50px" }} />
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Nejste přihlášen</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }
};

export default login;
