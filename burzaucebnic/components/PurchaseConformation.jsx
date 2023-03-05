import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { style } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ComformForm(props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleCloseNegative = () => {
    setOpen(false);
    props.handleClose();
  };
  const handleClosePositive = () => {
    setOpen(false);
    props.handleClose();

    props.handlePurchase();
  };

  return (
    <Box sx={{ borderRadius: 4 }}>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {" "}
          Opravdu si přejete zakoupit<b> {props.name}</b>?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Kliknutím se zavazujete ke koupi
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNegative}>Ne</Button>
          <Button onClick={handleClosePositive}>Ano</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
