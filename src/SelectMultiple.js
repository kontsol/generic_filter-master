import React, { useEffect, useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  Typography,
  Box,
} from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

export function SelectMultiple({
  filterType,
  filterOptions,
  filters,
  group,
  applyFilters,
  onChange,
  clearButton,
}) {
  const activeFilters = filters.map((filter, i) => filter.name);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (clearButton) {
      setChecked([]);
    }
  }, [clearButton]);

  const handleCheckboxChange = (option) => {
    setChecked([option]);
  };

  return (
    <div style={{ margin: "20px 20px 20px 0" }}>
      <FormControl fullWidth>
        <InputLabel style={{ paddingLeft: 10 }}>{filterType}</InputLabel>
        <Select
          multiple
          onClose={applyFilters}
          // value={filters.map((item, i) => item)}
          value={filters.map((item, i) => item.group === group && item.name)}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
          onChange={onChange}
        >
          {filterOptions.map((type) => (
            <MenuItem
              key={type}
              value={type}
              onClick={() => handleCheckboxChange(type)}
            >
              <Checkbox
                checked={checked[0] === type}
                onClick={() => handleCheckboxChange(type)}
                color="default"
              />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        height="8vh"
      >
        <Typography
          variant="h6"
          style={{ fontSize: "18px", fontStyle: "italic" }}
        >
          {checked}
        </Typography>
      </Box>
    </div>
  );
}
