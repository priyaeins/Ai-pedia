import React, { useState } from "react";
import { Box, Typography, Rating } from "@mui/material";

export default function ControlRating({
  initialValue = 2,
  showControlled = false,
  readOnly = false,
  onChange,
  controlledLabel = "Controlled",
  readOnlyLabel = "Rating",
  size = "small",
}) {
  const [value, setValue] = useState(initialValue);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue); // Call the onChange prop if provided
    }
  };

  return (
    <Box sx={{ "& > legend": { mt: 3 } }}>
      {showControlled && (
        <>
          <Typography component="legend">{controlledLabel}</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={handleRatingChange}
            size={size} // Use the size prop for controlling size
          />
        </>
      )}
      <Typography component="legend">{readOnlyLabel}</Typography>
      <Rating
        name="read-only"
        value={initialValue}
        readOnly={readOnly}
        size={size}
      />
    </Box>
  );
}
