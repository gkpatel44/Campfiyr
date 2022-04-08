import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { List, makeStyles } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import { isEmptyString } from "../../../../../util/util";

const useStyles = makeStyles((theme) => ({
  entries: {
    fontWeight: "700",
    fontFamily: "Roboto Mono",
    color: "white",
  },
  singleItem: {
    "&:hover": {
      background: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))",
    },
  },
}));

export default function RecentSearch(props) {
  const { textQuery, recentOptions = [] } = props;
  const classes = useStyles();
  const mostRecentOptions = [].concat(recentOptions).reverse();
  return (
    isEmptyString(textQuery) &&
    mostRecentOptions.slice(0, 4).map((option, index) => (
      <Link
        to={`/search/all?q=${String(option).toLowerCase()}`}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        key={`recentEntry-${index}`}
      >
        <List dense={true} className={classes.entries}>
          <ListItem className={classes.singleItem}>
            <ListItemAvatar>
              <Avatar>
                <HistoryIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${option}`} />
          </ListItem>
        </List>
      </Link>
    ))
  );
}

RecentSearch.propTypes = {
  inputQuery: PropTypes.string.isRequired,
  recentOptions: PropTypes.array.isRequired,
};
