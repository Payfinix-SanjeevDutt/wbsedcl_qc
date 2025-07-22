import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const MeterCard = ({ record, onClick }) => (
  <Card onClick={onClick} style={{ cursor: 'pointer' }}>
    <CardMedia component="img" height="140" image={record.image_url} alt="meter" />
    <CardContent>
      <Typography variant="subtitle1">Consumer ID: {record.consumer_id}</Typography>
      <Typography variant="body2">Meter Reading: {record.meter_reading}</Typography>
      <Typography variant="body2">Billing Month: {record.billing_month}</Typography>
    </CardContent>
  </Card>
);

export default MeterCard;
