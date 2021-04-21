import { React, useState } from 'react';
import '../../../App.css';

function SearchInput(props) {

  const [searchValue] = useState(props.searchValue);

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for a name..." onChange={(e) => props.useSearch(e.target.value)} value={props.searchValue}/>
    </div>
  );
}

export default SearchInput;