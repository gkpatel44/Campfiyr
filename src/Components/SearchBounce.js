import React, { Component } from "react";
import makeExpanding from "./reusable/ExpandingAnimation";
import ExpandingSearchBox from "./ExpandingSearchBox";

const ExpandableSearchBox = makeExpanding(ExpandingSearchBox);

class SearchBounce extends Component {
  render() {
    const style = {
      position: "fixed",
      // top: "50%",
      left: "50%",
      transform: "translate(-40%, -50%)",
      zIndex: 1,
    };
    return (
      <div>
        <div style={style}>
          <ExpandableSearchBox />
        </div>
      </div>
    );
  }
}

export default SearchBounce;
