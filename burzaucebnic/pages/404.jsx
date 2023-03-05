import React from "react";
import Image from "next/image";
import Head from "next/head";

import illustration from "../assets/404-doodle.png";

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>Stránka nenalezena</title>
      </Head>
      <div className="flex flex-col justify-center items-center">
        <Image src={illustration} alt="404 doodle" height={400} />
      </div>
    </>
  );
}
