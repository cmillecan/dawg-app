import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListAllBreeds.css";
import SearchBar from "./SearchBar";

const useFetchAllBreeds = () => {
  const [allBreeds, setAllBreeds] = useState([]);
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((resp) => resp.json())
      .then((allBreedsResp) => {
        const results = Object.keys(allBreedsResp.message);
        setAllBreeds(results);
      });
  }, []);

  return allBreeds;
};

const search = (items, searchTerm) => {
  return items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const useSearch = (items) => {
  const [searchItems, setSearchItems] = useState(items);
  const [filteredItems, setFilteredItems] = useState(searchItems);

  useEffect(() => {
    setSearchItems(items);
    setFilteredItems(items);
  }, [items]);

  const onSearch = (searchTerm) =>
    setFilteredItems(search(searchItems, searchTerm));

  return [filteredItems, onSearch];
};

const ListAllBreeds = () => {
  const breeds = useFetchAllBreeds();
  const [filteredBreeds, onSearch] = useSearch(breeds);
  return (
    <div className="all-breeds-container">
      <div className="list-display">
        <h1>Dog Breeds</h1>
        <div>
          <SearchBar onSearch={onSearch} />
        </div>
        <div className="breeds-list">
          <ul>
            {filteredBreeds.length === 0 ? (
              <div>
                <p>No Results</p>
              </div>
            ) : (
              filteredBreeds.map((breed) => {
                return (
                  <Link key={breed} to={`/breed/${breed}`}>
                    <li>{breed}</li>
                  </Link>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListAllBreeds;
