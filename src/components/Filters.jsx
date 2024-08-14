import React, { useEffect, useState } from "react";
import {
  Sheet,
  Button,
  Select,
  Option,
  FormControl,
  FormLabel,
} from "@mui/joy";

const Filters = ({ data, setDataFiltered }) => {
  const [uniqueAttributes, setUniqueAttributes] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    const attributesMap = {};

    const filteredData = data.filter((item) => {
      return Object.keys(selectedFilters).every((key) => {
        const filterValue = selectedFilters[key];

        return item.attributes.some((attribute) => {
          const attributeKey = Object.keys(attribute)[0];
          const attributeValue = Object.values(attribute)[0];

          if (attributeKey === key) {
            return attributeValue === filterValue;
          }

          return false;
        });
      });
    });

    filteredData.forEach((item) => {
      item.attributes.forEach((attribute) => {
        const key = Object.keys(attribute)[0];
        if (!attributesMap[key]) {
          attributesMap[key] = new Set();
        }
        attributesMap[key].add(attribute[key]);
      });
    });

    const attributesArray = Object.entries(attributesMap).map(
      ([key, values]) => ({
        key,
        values: Array.from(values),
      }),
    );

    setUniqueAttributes(attributesArray);
    setDataFiltered(filteredData);
  }, [data, selectedFilters, setDataFiltered]);

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({});
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: 1,
        width: 240,
      }}
    >
      <Button color="danger" onClick={resetFilters}>
        Reiniciar filtros
      </Button>
      {uniqueAttributes.map(({ key, values }) => (
        <FormControl key={key}>
          <FormLabel
            id={`select-field-label-${key}`}
            htmlFor={`select-field-${key}`}
          >
            {key}
          </FormLabel>
          <Select
            id={`select-field-${key}`}
            placeholder="Filtrar"
            value={selectedFilters[key]}
          >
            {values
              .sort((a, b) => {
                return a - b;
              })
              .map((value) => (
                <Option
                  key={value}
                  value={value}
                  onClick={() => handleFilterChange(key, value)}
                >
                  {value}
                </Option>
              ))}
          </Select>
        </FormControl>
      ))}
    </Sheet>
  );
};

export default Filters;
