import React from "react";
import Button from "@mui/material/Button";

function index({ props }) {
  return (
    <div>
      <h1>Opravdu si přejete zakoupit {props.name}</h1>
      <Button variant="contained" onClick={props.onClick}>
        Přejete
      </Button>
    </div>
  );
}

export default index;
