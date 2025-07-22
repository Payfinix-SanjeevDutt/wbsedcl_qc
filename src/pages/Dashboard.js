// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import MeterCard from '../components/MeterCard';
// import MeterModal from '../components/MeterModal';
// import { Grid, Container, Typography } from '@mui/material';

// const Dashboard = () => {
//   const [records, setRecords] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     axios.get('/qcwbsedcl-master').then(res => setRecords(res.data)).catch(console.error);
//   }, []);

//   return (
//     <Container>
//       <Typography variant="h4" mt={4} mb={2}>Meter Reading Records</Typography>
//       <Grid container spacing={2}>
//         {records.map(record => (
//           <Grid item xs={12} sm={6} md={4} key={record.id}>
//             <MeterCard record={record} onClick={() => setSelected(record)} />
//           </Grid>
//         ))}
//       </Grid>
//       {selected && <MeterModal record={selected} onClose={() => setSelected(null)} />}
//     </Container>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import MeterCard from '../components/MeterCard';
import MeterModal from '../components/MeterModal';
import { Grid, Container, Typography, Pagination, Box } from '@mui/material';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (currentPage) => {
    try {
      const res = await axios.get(`/qcwbsedcl-master?page=${currentPage}&per_page=12`);
      setRecords(res.data.data);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2} sx={{textAlign:'center'}}>Meter Reading Records</Typography><br/>
      <Grid container spacing={2}>
        {records.map(record => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <MeterCard record={record} onClick={() => setSelected(record)} />
          </Grid>
        ))}
      </Grid>

      {selected && <MeterModal record={selected} onClose={() => setSelected(null)} />}

      <Box display="flex" justifyContent="center" mt={9} mb={6}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Container>
  );
};

export default Dashboard;

