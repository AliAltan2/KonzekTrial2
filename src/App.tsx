import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { Box, TextField, MenuItem } from "@mui/material";
// appollo or axios, which should I use here ? apoollo because I couldn't get axious to work with API
import "./App.css";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://countries.trevorblades.com",
  });

  const LIST_COUNTRIES = gql`
    {
      countries {
        name
        code
        native
        capital
        emoji
        currency
      }
    }
  `;
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");
  const [totalCountires, setTotalCountires] = useState([]); // this is litterally so I can select the 10'th country or last country that loads

  function CountrySelect() {
    const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

    if (loading || error) {
      return <p>{error ? error.message : "Loading..."}</p>;
    }
    //    sssss
    return (
      <div className="flex items-center justify-center m-3">
        <Box width={"400px"}>
          <TextField
            label="Select Countries"
            select
            value={country}
            fullWidth
            onChange={(event) => setCountry(event.target.value)}
            SelectProps={{
              multiple: false, //at most one item can be selecet at a time
            }}
          >
            {data.countries
              .filter((country: any) => {
                return search.toLowerCase() === ""
                  ? country.name
                  : country.name.toLowerCase().includes(search);
              })
              .map((country: any) => (
                <MenuItem value={country.name} key={country.code}>
                  {country.name + " " + country.code + " " + country.emoji}
                </MenuItem>
              ))}
          </TextField>
        </Box>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h3 className="text-xl">Search Bar</h3>
      <div>
        <div className="flex items-center">
          <div className="flex space-x-1">
            <input
              type="text"
              className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder={"Searching"}
              onChange={(e) => setSearch(e.target.value)} // Search is waaaay to basic for this to work properly, so I need to rework this
            />
            <button className="px-4 text-white bg-purple-600 rounded-full ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <CountrySelect />
    </div>
  );
}

export default App;
