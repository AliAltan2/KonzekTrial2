import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

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

//pre-defined colours
const COLOURS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-yellow-500",
  "bg-blue-900",
];

const PRECOLOURED_INDEX = "10";

function CountryList() {
  const [currentColorsIndex, setCurrentColorsIndex] = useState(0);
  const [isActive, setIsActive] = useState<{ [key: string]: boolean }>({});

  let currentColor = COLOURS[currentColorsIndex];

  useEffect(() => {
    setTimeout(() => {
      let currentColouredElement = document.getElementById(PRECOLOURED_INDEX);
      if (currentColouredElement === null) {
        for (let i = 9; i >= 0 && currentColouredElement === null; i--)
          currentColouredElement = document.getElementById(i.toString());
      }
      const countryCode: any = currentColouredElement?.getAttribute("data-key");
      setIsActive({
        [countryCode]: !isActive[countryCode],
      });
      setCurrentColorsIndex(0);
    }, 1500);
  }, []);

  function handleOnClick(
    event: any,
    countryCode: string,
    countryIndex: number
  ) {
    setIsActive({
      [countryCode]: !isActive[countryCode],
    });

    if (currentColorsIndex == 6) {
      setCurrentColorsIndex(0);
    } else {
      setCurrentColorsIndex(currentColorsIndex + 1);
    }
  }

  const { error, data, loading } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-xl text-bold">Konzek Front-end trial Task</div>
      <div className="w-80">
        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Country Name"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {data.countries.map(
        (
          country: {
            code: string;
            name: string;
          },
          index: number
        ) => (
          <ul className=" flex flex-row items-center justify-center w-80 max-w-md divide-y border-b border-gray-700 mt-4">
            <li
              className={
                isActive[country.code as string]
                  ? `${currentColor} cursor-pointer p-4`
                  : "cursor-pointer p-4"
              }
              key={country.code}
              id={index as any}
              data-key={country.code}
              onClick={(event) =>
                handleOnClick(event, country.code as string, index)
              }
            >
              {country.name}
            </li>
          </ul>
        )
      )}
    </div>
  );
}

export default CountryList;
