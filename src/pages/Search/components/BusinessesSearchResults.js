import { CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Person } from "@material-ui/icons";
import PropTypes from "prop-types";

import React from "react";
import { Link } from "react-router-dom";
import { Chip } from "@material-ui/core";
import { BUSINESSNAME } from "../../../util/keywords";
import PersonSkeleton from "./PersonSkeleton";
import { firebaseAnalytics } from "../../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  avatar: {
    backgroundColor: grey,
  },

  chip: {
    cursor: "pointer",
    background: "#383D43",
    padding: theme.spacing(0.5),
    color: "#FFFFFF",
  },
  description: {
    color: "#ababab",
  },
}));

const renderBasicChip = (cat, index, classes) => {
  return (
    <Link to={`/search/category/${cat}`} style={{ padding: "2px" }}>
      <Chip
        variant="outlined"
        size="small"
        label={`${cat}`}
        key={`cat-${cat}-${index}`}
        className={classes.chip}
      />
    </Link>
  );
};

const SingleBusinessCard = (props) => {
  const { classes, business } = props;
  return (
    <Card
      className={classes.root}
      style={{ background: "#292C31", padding: "8px" }}
      elevation={0}
    >
      <CardHeader
        avatar={
          <>
            <Link
              to={`/user/${business.uid}`}
              onClick={() => {
                firebaseAnalytics.logEvent("view_business", {
                  from: "search_card",
                  business_id: business.uid,
                });
              }}
            >
              <Avatar
                className={classes.avatar}
                alt={business && business[BUSINESSNAME]}
                src={business?.photoURL || business?.imageDownloadURL}
              >
                <Person />
              </Avatar>
            </Link>
          </>
        }
        //Please uncomment this once actions are available for each card, currently no actions attached
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={
          <Link
            to={`/user/${business.uid}`}
            style={{ color: "white" }}
            onClick={() => {
              firebaseAnalytics.logEvent("view_business", {
                from: "search_card",
                business_id: business.uid,
              });
            }}
          >
            <span className={classes.typoGraphy}>
              {`${business && business[BUSINESSNAME]} `}
            </span>
          </Link>
        }
        subheader={
          <>
            {Array.isArray(business.category_array) &&
              business.category_array.map((item, index) =>
                renderBasicChip(item, index, classes)
              )}
            <br />
            <span className={classes.description}>{business?.bio}</span>
          </>
        }
      />
    </Card>
  );
};
SingleBusinessCard.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
};

export default function BusinessesSearchResults(props) {
  const classes = useStyles();
  const { business, isSearching } = props;

  return (
    <>
      {isSearching && (
        <div>
          <PersonSkeleton />
          <PersonSkeleton />
        </div>
      )}
      {Array.isArray(business) && business.length !== 0 ? (
        business.map((item, index) => (
          <div
            style={{
              width: "100%",
              padding: "8px",
              background: "#383D43",
              borderRadius: "8px",
            }}
          >
            <SingleBusinessCard
              business={item.data}
              classes={classes}
              key={index}
            />
          </div>
        ))
      ) : (
        <span className="text-xs" style={{ color: "#ababab" }}>
          Nothing to Display
        </span>
      )}
    </>
  );
}

BusinessesSearchResults.propTypes = {
  business: PropTypes.array.isRequired,
  isSearching: PropTypes.bool,
};
