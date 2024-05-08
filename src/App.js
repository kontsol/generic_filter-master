import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Map } from "./Map";
import { SelectMultiple } from "./SelectMultiple";
import { HAZARDTYPES, PROBABILITY, MAGNITUDE } from "./options";
import { data, cities_coordinates } from "./data";

export default function App() {
  const [cities, setCities] = useState({});
  const [hazards, setHazards] = useState();
  const [clearButton, setClearButton] = useState(false);
  const [typeFilters, setTypeFilters] = useState([]);
  const [magnitudeFilters, setMagnitudeFilters] = useState([]);
  const [probabilityFilters, setProbabilityFilters] = useState([]);
  const [filtered_cities, setFilteredCities] = useState({});

  // Button
  const clearResults = () => {
    setTypeFilters([]);
    setProbabilityFilters([]);
    setMagnitudeFilters([]);
    setFilteredCities([]);

    setClearButton((prevValue) => !prevValue);

    // console.log(typeFilters);
    // console.log(magnitudeFilters);
    // console.log(probabilityFilters);
  };

  // console.log(clearButton);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value.toString();
    const newValue = selectedValue.startsWith(",")
      ? selectedValue.slice(1)
      : selectedValue;

    setTypeFilters([newValue]);
    setClearButton(false);
  };

  const handlePropabilityChange = (event) => {
    const selectedValue = event.target.value.toString();
    const newValue = selectedValue.startsWith(",")
      ? selectedValue.slice(1)
      : selectedValue;

    setProbabilityFilters([newValue]);
  };

  const handleMagnitudeChange = (event) => {
    const selectedValue = event.target.value.toString();
    const newValue = selectedValue.startsWith(",")
      ? selectedValue.slice(1)
      : selectedValue;

    setMagnitudeFilters([newValue]);
  };

  useEffect(() => {
    // Function to filter cities based on selected filters
    if (
      typeFilters.length > 0 &&
      probabilityFilters.length > 0 &&
      magnitudeFilters.length > 0
    ) {
      const filterCities = () => {
        const filtered = {};
        Object.keys(data).forEach((cityId) => {
          const cityHazards = data[cityId];
          const matchesType =
            typeFilters.length === 0 ||
            cityHazards.some((hazard) => typeFilters.includes(hazard.type));
          const matchesProbability =
            probabilityFilters.length === 0 ||
            cityHazards.some((hazard) =>
              probabilityFilters.includes(hazard.probability)
            );
          const matchesMagnitude =
            magnitudeFilters.length === 0 ||
            cityHazards.some((hazard) =>
              magnitudeFilters.includes(hazard.magnitude)
            );
          if (matchesType && matchesProbability && matchesMagnitude) {
            filtered[cityId] = cities_coordinates[cityId];
          }
        });
        return filtered;
      };

      setFilteredCities(filterCities());
    }
  }, [typeFilters, probabilityFilters, magnitudeFilters]);

  return (
    <Grid container>
      <Grid item lg={2}>
        <SelectMultiple
          filterType={"Hazard Filter"}
          filterOptions={HAZARDTYPES}
          filters={typeFilters}
          setFilters={setTypeFilters}
          onChange={handleFilterChange}
          clearButton={clearButton}
        />
      </Grid>
      <Grid item lg={2}>
        <SelectMultiple
          filterType={"Probability Filter"}
          filterOptions={PROBABILITY}
          filters={probabilityFilters}
          setFilters={setProbabilityFilters}
          onChange={handlePropabilityChange}
          clearButton={clearButton}
        />
      </Grid>
      <Grid item lg={2}>
        <SelectMultiple
          filterType={"Magnitude Filter"}
          filterOptions={MAGNITUDE}
          filters={magnitudeFilters}
          setFilters={setMagnitudeFilters}
          onChange={handleMagnitudeChange}
          clearButton={clearButton}
        />
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        onClick={clearResults}
        style={{
          // width: "140px",
          height: "35px",
          margin: "35px",
          backgroundColor: "black",
        }}
      >
        Clear results
      </Button>
      <Grid item lg={12}>
        <Map data={filtered_cities} />
      </Grid>
    </Grid>
  );
}
