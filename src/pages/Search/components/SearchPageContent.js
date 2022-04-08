import { Paper } from "@material-ui/core";
import React from "react";
import PeopleSearchResults from "./PeopleSearchResults";
import { Typography } from "@material-ui/core";
import BusinessesSearchResults from "./BusinessesSearchResults";
import RelatedCategoriesResults from "./RelatedCategoriesResults";
import PropTypes from "prop-types";

function SearchPageContent(props) {
  const { param, classes, data } = props;
  switch (param) {
    case "all":
      return (
        <div className={classes.root} style={{ background: "#292C31" }}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.typoGraphy}>
              People
            </Typography>
            <PeopleSearchResults
              people={data?.users || []}
              isSearching={data?.isSearching}
            />
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.typoGraphy}>
              Businesses
            </Typography>
            <BusinessesSearchResults
              business={data?.businesses || []}
              isSearching={data?.isSearching}
            />
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.typoGraphy}>
              Related Categories
            </Typography>
            <RelatedCategoriesResults
              categories={data?.categories}
              isSearching={data?.isSearching}
            />
          </Paper>
        </div>
      );
    case "people":
      return (
        <div className={classes.root} style={{ background: "#292C31" }}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.typoGraphy}>
              People
            </Typography>
            <PeopleSearchResults
              people={data?.users || []}
              isSearching={data?.isSearching}
            />
          </Paper>
        </div>
      );
    case "businesses":
      return (
        <div className={classes.root} style={{ background: "#292C31" }}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.typoGraphy}>
              Businesses
            </Typography>
            <BusinessesSearchResults
              business={data?.businesses || []}
              isSearching={data?.isSearching}
            />
          </Paper>
        </div>
      );
    case "category":
      return (
        <div>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.typoGraphy}>
              Categories
            </Typography>
            <RelatedCategoriesResults categories={data?.categories} />
          </Paper>
        </div>
      );
    case "events":
      return <div>{`:)`}</div>;

    default:
      return <div>{`:)`}</div>;
  }
}

SearchPageContent.propTypes = {
  classes: PropTypes.object.isRequired,
  param: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default SearchPageContent;
