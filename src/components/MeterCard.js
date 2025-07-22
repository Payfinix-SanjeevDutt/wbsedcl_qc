import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
} from "@mui/material";

const MeterCard = ({ record, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: "pointer",
      maxWidth: 330,
      height:'100%',
      borderRadius: 3,
      boxShadow: 3,
      transition: "0.3s",
      "&:hover": {
        boxShadow: 6,
        transform: "translateY(-4px)",
      },
      m: 2,
    }}
  >
    <CardActionArea>
      <CardMedia
        component="img"
        height="180"
        image={record.image_url}
        alt="Meter"
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
  </Card>
);

export default MeterCard;
