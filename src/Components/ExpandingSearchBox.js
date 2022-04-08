import React, { useEffect, useState } from "react";
import { fade, IconButton, TextField, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import {
  // ResultView,
  SupplementarySearchResultsPopper,
} from "../pages/Search/components/SearchBar";
import { connect } from "react-redux";
import { searchBySearchArray } from "../redux/actions";
const ExpandingSearchBox = (props) => {
  const baseStyles = {
    open: {
      width: 100,
    },
    closed: {
      width: 0,
    },

    icon: {
      width: 40,
      height: 40,
      padding: 5,
      left: 3,
      //   top: 10,
    },
    frame: {
      fontFamily: "Roboto Mono",
      backgroundColor: fade("#fff", 0.15),
      borderRadius: "8px",
      borderWidth: "0px",
      color: "white",

      "&:hover": { backgroundColor: fade("#fff", 0.25), color: "#b4a2ff" },
      "&.Mui-focused ": {
        color: "white",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
        // borderColor: "blue",
        color: "white",
        borderRadius: 25,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
        // borderColor: "blue",
        color: "white",
        borderRadius: 25,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: "#fff",
        borderRadius: 25,
      },
    },
  };

  const useStyles = makeStyles(() => ({
    input: {
      "& .MuiInputBase-root": {
        color: "#FFFFFF",
      },
    },
    secondaryPopper: {
      color: "#ABABAB",
      background: "#383D43",
      maxWidth: 300,
      width: 200,
      "&:hover": {
        color: "#FFFFFF",
        background: "#292C31",
      },
    },
  }));

  const classes = useStyles();
  const { isOpen, onClick, additionalStyles } = props;
  let textStyle = isOpen ? baseStyles.open : baseStyles.closed;
  textStyle = Object.assign(
    textStyle,
    additionalStyles ? additionalStyles.text : {}
  );

  const divStyle = Object.assign(
    {},
    textStyle,
    baseStyles.frame,
    additionalStyles ? additionalStyles.frame : {}
  );
  divStyle.width += baseStyles.icon.width + 5;

  const [query, setQuery] = useState("");
  const [openPopper, setOpenPopper] = useState(false);
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const {
    recentSearches,
    // searchResults,
    dispatch,
  } = props;

  useEffect(() => {
    if (query.length > 0) {
      setOpenPopper(true);
    } else {
      setOpenPopper(false);
      setPopperAnchorEl(null);
    }
  }, [query]);

  return (
    <div style={divStyle}>
      <IconButton
        style={baseStyles.icon}
        className="focus:outline-none"
        onClick={() => onClick()}
      >
        <Search style={{ color: "white", left: "3.5px" }} />
      </IconButton>
      {/*<TextField name="search" style={textStyle} />*/}
      <TextField
        name="search"
        style={textStyle}
        className={classes.input}
        onChange={(e) => {
          const userInput = e.target.value;
          setQuery(userInput);
          dispatch(searchBySearchArray(null, userInput.toLowerCase()));
          if (userInput.length > 0) {
            setPopperAnchorEl(e.currentTarget);
          }
        }}
        onBlur={() => {
          setOpenPopper(false);
        }}
      />
      <SupplementarySearchResultsPopper
        openPopper={openPopper}
        popperAnchorEl={popperAnchorEl}
        classes={classes}
        key={"secondary-results-popper"}
        query={query}
        recentSearches={recentSearches}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    searching: state.appInterface.searching,
    searchResults: state.appInterface.searchResults,
    recentSearches: state.search.recentSearches,
  };
}

export default connect(mapStateToProps)(ExpandingSearchBox);
