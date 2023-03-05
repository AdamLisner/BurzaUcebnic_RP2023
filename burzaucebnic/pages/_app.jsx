import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/App.module.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <div className={styles.application}>
        <Navbar />
        <Component className="w-full pageContent" {...pageProps} />
        <Footer />
      </div>
    </SessionProvider>
  );
}
