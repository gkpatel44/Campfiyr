import { InputAdornment, ListItem } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { alpha } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { Person } from "@material-ui/icons";

import { searchBySearchArray } from "../../../redux/actions";
import useStringUtil from "../../../hook/useStringUtil";
import { Avatar } from "@material-ui/core";
import { ListboxComponent, renderGroup } from "./SearchBarList/SearchBarList";
import { useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Popper } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import { firebaseAnalytics } from "../../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: "2rem",
    height: "2rem",
    backgroundColor: "#b4a2ff",
  },
  names: {
    paddingLeft: "1em",
    fontWeight: "700",
  },
  inputRoot: {
    width: 300,
    fontFamily: "Roboto Mono",
    backgroundColor: alpha("#fff", 0.15),
    borderRadius: 25,
    borderWidth: "0px",
    color: "white",

    "&:hover": { backgroundColor: alpha("#fff", 0.25), color: "#b4a2ff" },
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
  inputInput: {
    color: "white",
    fontSize: "10px",
  },
  searchIcon: {
    color: "white",
  },
  option: {
    color: "#ABABAB",
    "&:hover": {
      color: "#FFFFFF",
      background: "#292C31",
    },
  },
  paper: {
    background: "#383D43",
  },
  secondaryPopper: {
    color: "#ABABAB",
    background: "#383D43",
    maxWidth: 300,
    width: 300,
    "&:hover": {
      color: "#FFFFFF",
      background: "#292C31",
    },
  },
}));

export const SupplementarySearchResultsPopper = (props) => {
  const {
    recentSearches,
    query,
    classes,
    openPopper,
    popperAnchorEl,
    withResults,
    otherProps,
  } = props;
  return (
    <Popper
      open={openPopper}
      anchorEl={popperAnchorEl}
      placement={"bottom"}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.secondaryPopper}>
            {/* <Typography className={classes.typography}>
          The content of the Popper.
        </Typography> */}
            <ListboxComponent
              textQuery={query}
              recentOptions={recentSearches}
              withResults={withResults || false}
              data={<div>penis</div>}
              index={1}
              {...otherProps}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

SupplementarySearchResultsPopper.propTypes = {
  recentSearches: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  openPopper: PropTypes.bool.isRequired,
  popperAnchorEl: PropTypes.node, //required , but nullable
  withResults: PropTypes.bool,
};
export const ResultView = (props) => {
  const { option, classes } = props;
  const history = useHistory();

  return (
    <React.Fragment>
      {option?.id && (
        <ListItem
          onClick={() => {
            history.push(`/user/${option.id}`);
          }}
          style={{ margin: -11 }}
        >
          <Avatar
            alt={
              (option?.data &&
                (option.data.displayname || option.data["business name"])) ||
              ""
            }
            src={option?.data?.photoURL || option?.data?.imageDownloadURL}
            className={classes.avatar}
            onClick={() => {
              history.push(`/user/${option.id}`);
            }}
          >
            <Person />
          </Avatar>

          <Typography
            variant="button"
            className={classes.names}
            onClick={() => {
              history.push(`/user/${option.id}`);
            }}
          >
            {(option?.data &&
              (option.data.displayname || option.data["business name"])) ||
              ""}
          </Typography>
        </ListItem>
      )}
    </React.Fragment>
  );
};

function SearchBar(props) {
  const classes = useStyles();
  const [openPopper, setOpenPopper] = useState(false);
  const [popperAnchorEl, setPopperAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const history = useHistory();

  const { isEmptyString } = useStringUtil();

  const { dispatch, searchResults, searching, recentSearches } = props;
  const isValidArray = (something) => {
    return something && Array.isArray(something);
  };
  const optionsRenderer = () => {
    return isValidArray(searchResults) && searchResults.length > 0
      ? searchResults
      : [""];
  };

  useEffect(() => {
    if (
      isValidArray(searchResults) &&
      searchResults.length < 2 &&
      query.length > 1
    ) {
      setOpenPopper(true);
    } else {
      setOpenPopper(false);
      setPopperAnchorEl(null);
    }
    firebaseAnalytics.logEvent("search", { search_term: query });
  }, [searchResults, query]);

  return (
    <div>
      <Autocomplete
        freeSolo
        size="small"
        id="user-search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
          option: classes.option,
          paper: classes.paper,
        }}
        loading={searching}
        // onFocus={() => {
        //   dispatch(searchBySearchArray(null, query));
        // }}

        onBlur={() => {
          setQuery("");
        }}
        options={optionsRenderer()}
        getOptionLabel={(option) =>
          (option.data &&
            (option.data.displayname || option.data["business name"])) ||
          ""
        }
        noOptionsText={"Nothing to show"}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            style={{ fontSize: "12px" }}
            placeholder="Search for businesses, users and products"
            onChange={(e) => {
              const userInput = e.target.value;
              setQuery(userInput);
              dispatch(searchBySearchArray(null, userInput.toLowerCase()));
              if (userInput.length > 1) {
                setPopperAnchorEl(e.currentTarget);
              }
            }}
            onBlur={() => {
              setOpenPopper(false);
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              ),
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter" && !isEmptyString(query)) {
                history.push(`/search/all?q=${String(query).toLowerCase()}`);
              }
            }}
          />
        )}
        renderOption={(option) =>
          isValidArray(searchResults) && (
            <ResultView option={option} classes={classes} />
          )
        }
        ListboxComponent={ListboxComponent}
        ListboxProps={{
          textQuery: query,
          recentOptions: recentSearches,
        }}
        renderGroup={renderGroup}
        disableListWrap
      />
      <SupplementarySearchResultsPopper
        openPopper={openPopper}
        popperAnchorEl={popperAnchorEl}
        classes={classes}
        key={"secondary-results-popper"}
        query={query}
        recentSearches={recentSearches}
        withResults={
          (isValidArray(searchResults) && searchResults.length > 0) || false
        }
        searchResults={searchResults} //not a required prop, not even used
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    allUsersAndBusinesses: state.user.allUsersAndBusinesses,
    allUsersAndBusinessesLastPull: state.user.allUsersAndBusinessesLastPull,
    lastCall: state.appInterface.lastCall,
    searching: state.appInterface.searching,
    searchResults: state.appInterface.searchResults,
    recentSearches: state.search.recentSearches,
  };
}

export default connect(mapStateToProps)(SearchBar);
