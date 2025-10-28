import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function TablePaginationDemo({ count, page, onPageChange }) {
  const [rowsPerPage, setRowsPerPage] = React.useState(2); // Set initial rows per page to 2

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5)); // Update rows per page
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
}
