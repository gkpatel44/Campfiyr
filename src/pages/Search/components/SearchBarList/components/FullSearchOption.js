import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { List, makeStyles } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStringUtil from "../../../../../hook/useStringUtil";

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
export default function FullSearchOption(props) {
  const { textQuery } = props;
  const classes = useStyles();
  const history = useHistory();
  const { isEmptyString } = useStringUtil();
  return (
    <Link
      to={`/search/all?q=${String(textQuery).toLowerCase()}`}
      onClick={() => {
        history.push(`/search/all?q=${String(textQuery).toLowerCase()}`);
      }}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {!isEmptyString(textQuery) && (
        <List dense={true} className={classes.entries}>
          <ListItem className={classes.singleItem}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: "#7950F3" }}>
                <SearchIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`Search for ${textQuery}`} />
          </ListItem>
        </List>
      )}
    </Link>
  );
}

FullSearchOption.propTypes = {
  inputQuery: PropTypes.string,
};
