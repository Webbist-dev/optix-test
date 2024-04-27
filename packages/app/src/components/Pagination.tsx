import React, { useState } from "react";
import { Pagination as MuiPagination } from "@mui/material";

interface Pagination {
  page: number;
  totalPages: number;
}

const Pagination: React.FC<Pagination> = ({page, totalPages}) => {
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("Page changed to:", value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      color="primary"
      sx={{ margin: "auto", marginTop: 4 }}
    />
  );
};

export default Pagination;
