import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  Collapse,
} from "@mui/material";
import axios from "../api/axios";

const MeterCard = ({ record, onClick, onSubmitSuccess, corrected = "" }) => {
  const [skipping, setSkipping] = useState(false);
  const [gone, setGone] = useState(false); // controls collapse

  // existing submit (pass/fail) – unchanged, no alerts
  const submit = async () => {
    const isFail = corrected.trim() !== "";
    try {
      await axios.post("/qcupdate-meter", {
        id: record.id,
        status: isFail ? "fail" : "pass",
        corrected_value: isFail ? corrected : "",
      });
      // If you also want to remove the card on submit success:
      // setGone(true);
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  // Skip -> send status=skip and collapse the card on success
  const handleSkip = async (e) => {
    e.stopPropagation();
    if (skipping) return;
    setSkipping(true);
    try {
      await axios.post("/qcupdate-meter", {
        id: record.id,
        status: "skip",
        corrected_value: "",
      });
      setGone(true); // animate out; parent will be notified onExited
    } catch (err) {
      console.error("Skip failed:", err);
      setSkipping(false);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onClick?.(record);
  };

  return (
    <Collapse
      in={!gone}
      timeout={220}
      unmountOnExit
      onExited={() => onSubmitSuccess?.(record)} // tell parent after animation
    >
      <Card
        onClick={() => onClick?.(record)}
        sx={{
          cursor: "pointer",
          maxWidth: 330,
          height: "100%",
          borderRadius: 3,
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
          m: 2,
          opacity: skipping ? 0.7 : 1,
        }}
      >
        <CardActionArea disabled={skipping}>
          <CardMedia
            component="img"
            image={record.image_url}
            alt="Meter"
            loading="lazy"
            sx={{ width: "100%", height: "auto", display: "block" }}
          />

          <CardContent sx={{ px: 2, py: 1.5 }}>
            <Typography variant="body1" gutterBottom>
              Consumer ID: {record.consumer_id}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Meter Reading: {record.meter_reading}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Billing Month: {record.billing_month}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions
          sx={{ px: 2, pb: 2, pt: 0, justifyContent: "space-between" }}
        >
          <Button size="small" variant="outlined" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={handleSkip}
            disabled={skipping}
          >
            {skipping ? "Skipping..." : "Skip"}
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  );
};

export default MeterCard;
