import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FilterBar from "../../components/Filter/FilterBar";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";


interface Story {
  objectID: string;
  title: string;
  url: string;
  author: string;
  points: number;
  num_comments: number;
}

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("story");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [timeFilter, setTimeFilter] = useState<string>("");
  const [showSharePopup, setShowSharePopup] = useState<boolean>(false);

  const buildApiUrl = useCallback(
    (searchQuery: string, pageNumber: number) => {
      const baseUrl =
        sortBy === "date"
          ? "http://hn.algolia.com/api/v1/search_by_date"
          : "http://hn.algolia.com/api/v1/search";

      let url = `${baseUrl}?query=${searchQuery}&tags=${tag}&page=${pageNumber}`;

      if (timeFilter) {
        const now = Math.floor(Date.now() / 1000);
        if (timeFilter === "last24h") {
          url += `&numericFilters=created_at_i>${now - 86400}`;
        } else if (timeFilter === "pastWeek") {
          url += `&numericFilters=created_at_i>${now - 604800}`;
        } else if (timeFilter === "pastMonth") {
          url += `&numericFilters=created_at_i>${now - 2592000}`;
        } else if (timeFilter === "pastYear") {
          url += `&numericFilters=created_at_i>${now - 31536000}`;
        }
      }

      return url;
    },
    [sortBy, tag, timeFilter]
  );

  const fetchStories = useCallback(
    async (searchQuery: string, pageNumber: number) => {
      setLoading(true);
      const url = buildApiUrl(searchQuery, pageNumber);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setStories(data.hits);
        setTotalResults(data.nbHits);
        setPage(data.page);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
      setLoading(false);
    },
    [buildApiUrl]
  );

  useEffect(() => {
    fetchStories(query, 0);
  }, [fetchStories, query]);

  const toggleSharePopup = () => {
    setShowSharePopup(!showSharePopup);
  };

  const totalPages = Math.ceil(totalResults / 20);
  const maxPageButtons = 5;
  const getVisiblePageNumbers = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);
    const startPage = Math.max(
      0,
      Math.min(page - Math.floor(maxPageButtons / 2), totalPages - maxPageButtons)
    );
    return pageNumbers.slice(startPage, startPage + maxPageButtons);
  };

  return (
    <div className="dashboard">
      <Navbar
        query={query}
        setQuery={setQuery}
        handleSearch={() => fetchStories(query, 0)}
      />
      <FilterBar
        onTagChange={(newTag) => setTag(newTag)}
        onSortByChange={(newSortBy) => setSortBy(newSortBy)}
        onTimeFilterChange={(newTimeFilter) => setTimeFilter(newTimeFilter)}
      />

      <div className="result-count">
        {totalResults.toLocaleString()} results found
        <FontAwesomeIcon
          icon={faShareAlt}
          className="share-icon"
          onClick={toggleSharePopup}
        />
        {showSharePopup && (
          <div className="share-popup">
            <div className="share-option">
              <FontAwesomeIcon icon={faTwitter} className="share-option-icon" />
              <span>Share on Twitter</span>
            </div>
            <div className="share-option">
              <FontAwesomeIcon icon={faFacebook} className="share-option-icon" />
              <span>Share on Facebook</span>
            </div>
            <div className="share-option">
              <FontAwesomeIcon icon={faEnvelope} className="share-option-icon" />
              <span>Share via Email</span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="story-list">
          {stories.map((story) => (
            <div key={story.objectID} className="story-item">
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="story-title"
              >
                {story.title}
              </a>
              <p className="story-details">
                {story.points} points by {story.author} | {story.num_comments} comments
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => fetchStories(query, page - 1)}
          disabled={page === 0}
          className="pagination-arrow"
        >
          &laquo;
        </button>
        {getVisiblePageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => fetchStories(query, pageNum)}
            className={`pagination-number ${page === pageNum ? "active" : ""}`}
          >
            {pageNum + 1}
          </button>
        ))}
        <button
          onClick={() => fetchStories(query, page + 1)}
          disabled={page === totalPages - 1}
          className="pagination-arrow"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
