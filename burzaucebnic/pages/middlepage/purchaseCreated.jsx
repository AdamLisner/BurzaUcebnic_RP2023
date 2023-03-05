import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import postman from "../../assets/Messages-bro.png"
import { useRouter } from "next/router";

import React from "react";

function purchaseCreated() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/products");
  };
  return (
    <div className="flex flex-col justify-center gap-4 h-full items-center align-middle mt-7">
      <Typography variant="h5" component="div" className="text-center">
        Děkujeme! <br /> Prodejce jsme kontaktovali.  Vyčkejte na jeho email.
      </Typography>
      <Image src={postman} height={300} widht={300}/>
      <Button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Zpět do hlavní nabídky
      </Button>
    </div>
  );
}

export default purchaseCreated;
