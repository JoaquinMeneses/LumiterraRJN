import React from "react";
import {
  Sheet,
  Button,
  FormControl,
  FormLabel,
  Select,
  Option,
} from "@mui/joy";

const Filters = ({ filters, setFilters, fetchData }) => {
  const auctionsTypes = ["All", "Sale", "NotForSale"];
  const types = [
    "sword",
    "hands armor",
    "head armor",
    "feet armor",
    "legs armor",
    "chest armor",
  ];
  const qualities = ["basic", "ultimate", "enhanced", "advanced", "super"];
  const requiresLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    fetchData(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      auctionType: "All",
      type: "sword",
      quality: "basic",
      requiresLevel: 1,
    };
    setFilters(defaultFilters);
    fetchData(defaultFilters);
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 1,
        width: 200,
      }}
    >
      <Button color="neutral" onClick={resetFilters}>
        Reiniciar filtros
      </Button>
      <FormControl>
        <FormLabel>Status</FormLabel>
        <Select
          value={filters.auctionType}
          onChange={(event, newValue) => handleChange("auctionType", newValue)}
        >
          {auctionsTypes.map((auctionType) => (
            <Option key={auctionType} value={auctionType}>
              {auctionType}
            </Option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select
          value={filters.type}
          onChange={(event, newValue) => handleChange("type", newValue)}
        >
          {types.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Quality</FormLabel>
        <Select
          value={filters.quality}
          onChange={(event, newValue) => handleChange("quality", newValue)}
        >
          {qualities.map((quality) => (
            <Option key={quality} value={quality}>
              {quality}
            </Option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Requires level</FormLabel>
        <Select
          value={filters.requiresLevel}
          onChange={(event, newValue) =>
            handleChange("requiresLevel", newValue)
          }
        >
          {requiresLevels.map((requireLevel) => (
            <Option key={requireLevel} value={requireLevel}>
              {requireLevel}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Sheet>
  );
};

export default Filters;
