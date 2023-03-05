import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavItem from "./NavItem";

import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const MENU_LIST = [
    { text: "Domů", href: "/" },
    { text: "Knihy", href: "/products" },
  ];

  const { data: session, status } = useSession();
  // getCurrentSession();
  const [navActive, setNavActive] = useState();
  const [activeIdx, setActiveIdx] = useState();

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
          <h1 className="font-bold text-2xl pl-8 ">
            Burza <span className="text-blue-600">Učebnic</span>
          </h1>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}

          {session ? (
            <>
              <Link href={"/profile"}>
                <Image
                  className="rounded-full h-16"
                  src={session.user.image}
                  alt=""
                  height={64}
                  width={64}
                />
              </Link>
              <button
                onClick={() => {
                  signOut("google", { callbackUrl: process.env.NEXTAUTH_URL });
                }}
                className=""
              >
                Odhlásit
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: process.env.NEXTAUTH_URL,
                  });
                }}
                className=""
              >
                Přihlásit
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
