import { Box, Button, Typography } from "@mui/material";

import { useRouter } from "next/router";

import React from "react";

function productCreated() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push("/products");
  };
  return (
    <div className="flex flex-col justify-center gap-4 h-full items-center align-middle mt-7">
      <Typography variant="h5" component="div" className="text-center">
        Produkt byl úspěšně přidán do nabídky!
      </Typography>
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

export default productCreated;
