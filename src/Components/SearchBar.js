import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="searchbar-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(search);
        }}
      >
        <label htmlFor="header-search">
          <span className="visually-hidden">Search dog breeds</span>
        </label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          id="search"
          placeholder="Search dog breeds"
          name="s"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
