import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import SearchFilters from "./components/SearchFilters";
import useQuery from "../../hook/useQuery";
import { getSearchResults } from "../../redux/actions/search";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar";
import SearchPageContent from "./components/SearchPageContent";
import { firebaseAnalytics } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "8px",
    background: "#383D43",
    width: "100%",
    justifyContent: "center",
    color: "#383D43",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#383D43",
  },
  typoGraphy: {
    color: "white",
  },
}));

function Search(props) {
  const { dispatch, searchData, isSearching } = props;
  let query = useQuery();
  const type = String(props?.match?.params?.type).toLowerCase();

  const classes = useStyles();
  const queryParam = query.get("q");
  useEffect(() => {
    dispatch(getSearchResults(type, queryParam));
  }, [queryParam, dispatch, type]);
  useEffect(() => {
    firebaseAnalytics.logEvent("page_search", {
      query: queryParam,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div style={{ background: "#292C31", minHeight: "100vh" }}>
        <NavBar />
        <div className={classes.root}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            style={{
              background: "#292C31",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <Grid item xs={12} sm={12} md={3}>
              <SearchFilters />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper}>
                <SearchPageContent
                  classes={classes}
                  param={type}
                  data={{ ...searchData, isSearching }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              {/* Addvertisement to be added in future */}
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

Search.propTypes = {
  searchData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    searchData: state.search.searchData,
    isSearching: state.search.isSearching,
  };
}

export default connect(mapStateToProps)(Search);
