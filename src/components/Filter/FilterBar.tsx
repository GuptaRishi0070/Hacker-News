// src/components/FilterBar.tsx
import React from 'react';
import './FilterBar.css';


interface FilterBarProps {
  onTagChange: (tag: string) => void;
  onSortByChange: (sortBy: string) => void;
  onTimeFilterChange: (timeFilter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onTagChange, onSortByChange, onTimeFilterChange }) => {
  return (
    <div className="filter-bar">
      <span>Search</span>
      <select onChange={(e) => onTagChange(e.target.value)}>
  <option value="story">Stories</option>
  <option value="comment">Comments</option>
  <option value="poll">Polls</option>
  <option value="ask_hn">Ask HN</option>
  <option value="show_hn">Show HN</option>
  <option value="launch_hn">Launch HN</option>
  <option value="job">Jobs</option>
</select>

      <span>by</span>
      <select onChange={(e) => onSortByChange(e.target.value)}>
        <option value="popularity">Popularity</option>
        <option value="date">Date</option>
      </select>
      <span>for</span>
      <select onChange={(e) => onTimeFilterChange(e.target.value)}>
        <option value="">All time</option>
        <option value="last24h">Last 24h</option>
        <option value="pastWeek">Past Week</option>
        <option value="pastMonth">Past Month</option>
        <option value="pastYear">Past Year</option>
        <option value="customrange">Custom Range</option>
      </select>
    </div>
    
  );
};

export default FilterBar;
