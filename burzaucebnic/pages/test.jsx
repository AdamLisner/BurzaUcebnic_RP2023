import React from "react";

import NextAuth from "next-auth";

async function handleAuth(req, res) {
  const session = await NextAuth.getSession({ req });
  if (session.user) {
    console.log(session.user);
  } else {
    console.log("fuck");
  }
}

function test() {
  return <div>test</div>;
}

export default test;
