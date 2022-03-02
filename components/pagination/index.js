import { Button } from "@mui/material";
import React from "react";

const PaginationData = ({ page, setPage, totalPage }) => {
  return (
    <div className="flex space-x-2 items-center">
      <Button
        onClick={() => {
          page !== 1 && setPage(page - 1);
        }}
      >
        Prev
      </Button>
      <Button onClick={() => page !== totalPage && setPage(page + 1)}>
        Next
      </Button>
    </div>
  );
};

export default PaginationData;
