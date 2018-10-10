import React, { Component } from "react";

const regions = {
  Brazil: "br",
  Europe: "eune",
  Europe_West: "euw",
  Korea: "kr",
  Latin_America_North: "lan",
  Latin_America_SOUTH: "las",
  North_America: "na",
  Oceania: "oce",
  Russia: "ru",
  Turkey: "tr",
  Japan: "jp"
};

class RegionSelector extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <select value="Select a Region" onChange={this.props.onChange}>
          <option disabled={true}>Select a Region</option>
          {Object.keys(regions).map((el, index) => {
            return (
              <option key={index} value={regions[el]}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default RegionSelector;
