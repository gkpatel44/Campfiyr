import { CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Person } from "@material-ui/icons";
import PropTypes from "prop-types";

import React from "react";
import { Link } from "react-router-dom";
import { firebaseAnalytics } from "../../../firebase/firebase";
import PersonSkeleton from "./PersonSkeleton";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: grey,
  },
  description: {
    color: "#ababab",
  },
}));

const SinglePersonCard = (props) => {
  const { classes, person } = props;
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
              to={`/user/${person.uid}`}
              onClick={() => {
                firebaseAnalytics.logEvent("view_user", {
                  from: "search_card",
                  user_id: person.uid,
                });
              }}
            >
              <Avatar
                className={classes.avatar}
                alt={person?.displayName || person.displayname}
                src={person?.photoURL || person?.imageDownloadURL}
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
            to={`/user/${person.uid}`}
            style={{ color: "white" }}
            onClick={() => {
              firebaseAnalytics.logEvent("view_user", {
                from: "search_card",
                user_id: person.uid,
              });
            }}
          >
            <span
              className={classes.typoGraphy}
            >{`${person?.firstname} ${person.lastname}`}</span>
          </Link>
        }
        subheader={
          <span className={classes.description}> {`${person?.bio}`}</span>
        }
      />
    </Card>
  );
};
SinglePersonCard.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
};

export default function PeopleSearchResults(props) {
  const classes = useStyles();
  const { people, isSearching } = props;

  return (
    <>
      {isSearching && (
        <div>
          <div
            style={{
              width: "100%",
              padding: "8px",
              background: "#383D43",
              borderRadius: "8px",
            }}
          >
            <PersonSkeleton />
          </div>
          <div
            style={{
              width: "100%",
              padding: "8px",
              background: "#383D43",
              borderRadius: "8px",
            }}
          >
            <PersonSkeleton />
          </div>
        </div>
      )}
      {Array.isArray(people) && people.length !== 0 ? (
        people.map((item, index) => (
          <div
            style={{
              width: "100%",
              padding: "8px",
              background: "#383D43",
              borderRadius: "8px",
            }}
          >
            <SinglePersonCard
              person={item.data}
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

PeopleSearchResults.propTypes = {
  people: PropTypes.array.isRequired,
  isSearching: PropTypes.bool,
};
