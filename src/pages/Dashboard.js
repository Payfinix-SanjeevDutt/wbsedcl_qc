import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MeterCard from "../components/MeterCard";
import MeterModal from "../components/MeterModal";
import {
  Grid,
  Container,
  Typography,
  Pagination,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("oldest");
  const [date, setDate] = useState(""); // <-- new state for date

  const fetchData = async (currentPage) => {
    try {
      const order = sort === "latest" ? "desc" : "asc";

      const res = await axios.get("/qcwbsedcl-master", {
        params: {
          page: currentPage,
          per_page: 12,
          sort,
          order,
          date: date || undefined, // only include if selected
        },
      });

      setRecords(res.data.data);
      setTotalPages(res.data.pages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, date]);

  const handlePageChange = (_e, value) => setPage(value);

  const handleCardGone = (rec) => {
    setRecords((prev) => {
      const next = prev.filter((r) => r.id !== rec.id);
      if (next.length === 0 && page > 1) {
        setTimeout(() => setPage((p) => p - 1), 0);
      }
      return next;
    });
  };

  return (
    <Container>
      <Typography
        variant="h4"
        mt={4}
        mb={2}
        sx={{
          textAlign: "center",
          fontFamily: '"Poppins","Roboto","Helvetica","Arial",sans-serif',
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        Meter Reading Records
      </Typography>

      {/* Filters row */}
      <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
        {/* Simple date picker */}
        <TextField
          type="date"
          size="small"
          label="Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setPage(1); // reset to first page
          }}
        />

        {/* Sort dropdown */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <MenuItem value="latest">Newest first</MenuItem>
            <MenuItem value="oldest">Oldest first</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {records.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <MeterCard
              record={record}
              onClick={() => setSelected(record)}
              onSubmitSuccess={handleCardGone}
            />
          </Grid>
        ))}
      </Grid>

      {selected && (
        <MeterModal
          record={selected}
          onClose={() => setSelected(null)}
          onSubmitSuccess={() => {
            setSelected(null);
            fetchData(page);
          }}
        />
      )}

      <Box display="flex" justifyContent="center" mt={9} mb={6}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
