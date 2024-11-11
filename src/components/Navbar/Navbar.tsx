import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ query, setQuery, handleSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(); 
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="SearchHeader_logo">
          <a href="https://news.ycombinator.com">
            <img
              src="src/assets/899d76bbc312122ee66aaaff7f933d13.png"
              alt="Hacker News Logo"
            />
          </a>
          <a href="/dashboard" className="SearchHeader_label">
            Search
            <br />
            Hacker News
          </a>
        </span>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="navbar-search">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search stories by title, url or author"
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <span className="search-powered-by">
          Search by{" "}
          <img
            src="src\assets\algolia-logo.png"
            alt="Algolia"
            className="algolia-logo"
          />
        </span>
      </form>
      <div className="navbar-settings">
        <FontAwesomeIcon icon={faCog} className="settings-icon" />
      </div>
    </header>
  );
};

export default Navbar;
