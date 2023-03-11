import { useState } from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import query from "./SearchbarComponent";

function GetComponent() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://countries.trevorblades.com",
  });

  const LIST_COUNTRIES = gql`
    {
      countries {
        name
        native
        emoji
        currency
        code
      }
    }
  `;
  function CountrySelect() {
    const [country, setCountry] = useState("TR");
    const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

    if (loading || error) {
      return <p>{error ? error.message : "Loading..."}</p>;
    }

    return (
      // this part is not fit for the select option, but for now it must do, https://reactjsexample.com/react-based-list-with-selectable-and-navigable-items/
      <>
        (
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          {data.countries.map((country: any) => (
            <option key={country.code} value={country.code}>
              {country.name + " "}
              {country.code + " "}
              {country.emoji + " "}
              {country.currency}
            </option>
          ))}
        </select>
        );
      </>
    );
  }

  return (
    <>
      <CountrySelect />
    </>
  );
}

export default GetComponent;
