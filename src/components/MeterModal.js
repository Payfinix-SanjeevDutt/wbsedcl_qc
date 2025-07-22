import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import axios from '../api/axios';

const MeterModal = ({ record, onClose }) => {
  const [corrected, setCorrected] = useState('');

  const submit = async () => {
    const isFail = corrected.trim() !== '';

    try {
      await axios.post('/qcupdate-meter', {
        id: record.id,
        status: isFail ? 'fail' : 'pass',
        corrected_value: isFail ? corrected : ''
      });
      alert('Submitted!');
      onClose();
    } catch (err) {
      alert('Error submitting');
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Meter Reading Validation</DialogTitle>
      <DialogContent>
        <img src={record.image_url} alt="meter" width="100%" />
        <Typography mt={2}>Reading from DB: {record.meter_reading}</Typography>
        <TextField
          fullWidth
          label="Corrected Value (leave blank if correct)"
          value={corrected}
          onChange={(e) => setCorrected(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={submit} variant="contained">Submit</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MeterModal;





// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
// import axios from '../api/axios';

// const MeterModal = ({ record, onClose }) => {
//   const [corrected, setCorrected] = useState('');

//   const submit = async (status) => {
//     try {
//       await axios.post('/qcupdate-meter', {
//         id: record.id,
//         status,
//         corrected_value: status === 'fail' ? corrected : ''
//       });
//       alert('Submitted!');
//       onClose();
//     } catch (err) {
//       alert('Error submitting');
//     }
//   };

//   return (
//     <Dialog open onClose={onClose}>
//       <DialogTitle>Meter Reading Validation</DialogTitle>
//       <DialogContent>
//         <img src={record.image_url} alt="meter" width="100%" />
//         <Typography mt={2}>Reading from DB: {record.meter_reading}</Typography>
//         <TextField
//           fullWidth
//           label="Corrected Value"
//           value={corrected}
//           onChange={(e) => setCorrected(e.target.value)}
//           margin="normal"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => submit('pass')} variant="contained" color="success">Pass</Button>
//         <Button onClick={() => submit('fail')} variant="contained" color="error">Fail</Button>
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default MeterModal;

