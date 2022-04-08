import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardMedia } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    maxWidth: 400,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

export default function TeamCard(props) {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  const { name, position, education, imageLink } = props;
  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia className={classes.media} image={imageLink} title={name} />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {position}
        </Typography>
        <Typography variant="body2" component="p">
          {education}
        </Typography>
      </CardContent>
    </Card>
  );
}

TeamCard.propTypes = {
  children: PropTypes.node,
  uid: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
};
