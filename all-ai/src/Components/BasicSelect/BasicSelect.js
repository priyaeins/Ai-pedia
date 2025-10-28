import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  handleBusinessOperations,
  handleAutomationTools,
  handleFunction,
}) {
  const [selection, setSelection] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelection(value);

    // Call the corresponding function based on the selected value
    if (value === 10) {
      handleAutomationTools();
    } else if (value === 20) {
      handleBusinessOperations();
    } else if (value === 30) {
      handleFunction();
    }
  };

  return (
    <Box
      sx={{
        width: "90%",
        marginTop: 5,
        backgroundColor: "white",
        color: "white",
      }}
    >
      <FormControl
        fullWidth
        variant="outlined"
        sx={{ borderColor: "white", color: "white" }}
      >
        <InputLabel
          sx={{ color: "#000", fontSize: "16px", fontWeight: "Semibold" }}
          id="demo-simple-select-label"
        >
          On this page:
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          label="Selection"
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Change the border color
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "lightgray", // Change the border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "grey", // Change the border color when focused
            },
          }}
        >
          <MenuItem value={10}>AI Agent Automation Tools↓</MenuItem>
          <MenuItem value={20}>
            AI Agents Elevating Business Operations↓
          </MenuItem>
          <MenuItem value={30}>
            Future Prospects: Expanding AI Agent Functions↓
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
