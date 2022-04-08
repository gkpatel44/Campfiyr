import { makeStyles } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { firebaseAnalytics } from "../../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,

    width: "100%",
    // padding: "8px",
    background: "#292C31",
    borderRadius: "8px",
  },

  chip: {
    margin: theme.spacing(0.5),
    cursor: "pointer",
    background: "#383D43",
    padding: "8px",
    color: "#FFFFFF",
  },
}));

const RenderTags = (props) => {
  const { arr } = props;
  const classes = useStyles();
  const history = useHistory();
  return arr.map((data) => (
    <li
      key={`chip-${data}`}
      onClick={() => {
        history.push(`/search/all?q=${String(data).toLowerCase()}`);
        firebaseAnalytics.logEvent("view_category", {
          from: "search_card",
          category: data,
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <Chip label={data} className={classes.chip} />
    </li>
  ));
};

export default function RelatedCategoriesResults(props) {
  const classes = useStyles();
  const { categories } = props;
  const placeholderCategories = [
    "Food",
    "Activity",
    "Party",
    "Beauty",
    "Lifestyle",
  ];

  return (
    <div className={classes.root}>
      <RenderTags arr={categories || placeholderCategories} />
    </div>
  );
}
