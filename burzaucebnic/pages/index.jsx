import Head from "next/head";
import Image from "next/image";
import React from "react";

import student from "../assets/happy_students.png";
import boywithbook from "../assets/Ecoeducation-bro.png"



export default function Home() {
  //const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Burza učebnic</title>
      </Head>
      <div className="flex flex-col justify-evenly items-center    md:flex-row ">
        <div className="flex justify-center md:w-1/2">
          <Image src={student} height={500} width={500} />
        </div>
        <div className="">
          <h1 className="text-4xl font-bold text-blue m-5">
            Vítejte na Burze <span>učebnic</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-center   md:flex-row ">
        <div className="text-center w-3/5">
          <h2 className="text-3xl font-bold text-blue ">
            Nekupujte zbytečně nové učebnice
          </h2>
          <p>Sežeňte je levněji a ušetřete přírodu</p>
        </div>
        <div className=" w-full flex justify-center md:w-1/2">
          <Image src={boywithbook} height={500} width={500} />
        </div>
      </div>  
    </>
  );
}
