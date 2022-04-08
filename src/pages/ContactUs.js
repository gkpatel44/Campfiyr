import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import ContactForm from "../Components/contactUs/ContactForm";
import LandingNavBar from "../Components/LandingNavBar";
import { MapContainer } from "../Components/Map/LocationManagerMapWindow";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#292C31",
    color: "#fff",
    position: "relative",
  },
  other: {
    marginTop: theme.spacing(10),
  },
}));

export default function ContactUs() {
  const classes = useStyles();
  const toronto = {
    lat: 43.653225,
    lng: -79.383186,
  };
  return (
    <div className={classes.root}>
      <LandingNavBar />
      <div className={classes.other}>
        <Grid container>
          <Grid item xs={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={6}>
            <div style={{ height: `1000px`, width: `1000px` }}>
              <MapContainer location={toronto} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
