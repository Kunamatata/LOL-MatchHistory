import React from "react";

function Search(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        className="search"
        disabled={props.isDisabled}
        type="text"
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Search;
