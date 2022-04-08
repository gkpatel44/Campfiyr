import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Collapse, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    // maxWidth: 600,
    // maxWidth: "900px",
    background: "rgba(0,0,0,0.5)",
    borderRadius: "8px",
  },
  media: {
    height: 400,
    borderRadius: "8px",
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "1.1rem",
    color: "#fff",
  },
});

export default function ImageCard({ item, checked, id }) {
  const classes = useStyles();

  return (
    <Collapse
      in={checked}
      {...(checked ? { timeout: 1000 } : {})}
      className="flex justify-center items-center"
    >
      {/*<Card className={classes.root}>*/}
      <Grid container spacing={2} justifyContent="center">
        {id % 2 === 0 ? (
          <Grid item xs={12} sm={4}>
            <div style={{ width: "100%", padding: "16px" }}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h1"
                    className={classes.title}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.desc}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={8}>
          <div style={{ width: "100%", padding: "16px" }}>
            <CardMedia
              className={classes.media}
              image={item.media}
              title="Title"
            />
          </div>
        </Grid>
        {id % 2 ? (
          <Grid item xs={12} sm={4}>
            <div style={{ width: "100%", padding: "16px" }}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h1"
                    className={classes.title}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.desc}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Grid>
        ) : null}
      </Grid>
      {/*</Card>*/}
    </Collapse>
  );
}
