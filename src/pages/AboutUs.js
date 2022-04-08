import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
// import { Grid } from "@material-ui/core";
import React from "react";
// import TeamCard from "../Components/aboutUs/TeamCard";
import LandingNavBar from "../Components/LandingNavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#292C31",
    color: "#fff",
    padding: "100px 16px 16px",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  other: {
    marginTop: theme.spacing(10),
  },
  content: {
    width: "60%",
    "@media screen and (max-width: 640px)": {
      width: "100%",
    },
  },
}));
export default function AboutUs() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LandingNavBar />
      <div className={classes.content}>
        <Typography variant="h4">Our Story</Typography>
        <hr />
        <br />
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          The birth of Campfiyr
        </Typography>
        <Typography variant="body1" component="p">
          Since there is no centralized platform to create connections between
          local residents and local businesses, many promotions and offerings
          from small businesses are overlooked because their ads get diluted by
          the main content of these social media platforms.
        </Typography>
        <br />
        <Typography variant="body1" component="p">
          Campfiyr's goal is to provide a vibrant marketplace for local products
          and services, giving small businesses more exposure in their
          neighbourhood. This is an initiative not only to support local
          businesses, but to reconnect community members, discover fun
          experiences, encourage togetherness, and explore new opportunities
          near their home.
        </Typography>
      </div>
    </div>
    // <div className={classes.root}>
    //   <LandingNavBar />
    //   <div className={classes.other}>
    //     <Grid container>
    //       <Grid item container justifyContent="space-around">
    //         <Grid item xs={1}></Grid>
    //         <Grid item xs={4}>
    //           <Card style={{ width: "50%", height: "auto" }}>
    //             <img
    //               alt="placeholder"
    //               src="https://images.unsplash.com/photo-1531407676318-76cf12fc69a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    //             ></img>
    //           </Card>
    //         </Grid>
    //         <Grid item xs={6}>
    //           <Typography variant="h4">Our Story</Typography>
    //           <hr />
    //           <Typography variant="h6">The birth of Campfiyr</Typography>
    //           <Typography variant="body1" component="p">
    //             Since there is no centralized platform to create connections
    //             between local residents and local businesses, many promotions
    //             and offerings from small businesses are overlooked because their
    //             ads get diluted by the main content of these social media
    //             platforms.
    //           </Typography>
    //           <br />
    //           <Typography variant="body1" component="p">
    //             Campfiyr's goal is to provide a vibrant marketplace for local
    //             products and services, giving small businesses more exposure in
    //             their neighbourhood. This is an initiative not only to support
    //             local businesses, but to reconnect community members, discover
    //             fun experiences, encourage togetherness, and explore new
    //             opportunities near their home.
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={1}></Grid>
    //       </Grid>
    //       <Grid item container justifyContent="space-around">
    //         <Grid item xs={8}>
    //           <Typography variant="h4">
    //             We’re a group of recent university graduates and looking to do
    //             our part to support local businesses during this difficult time.
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={8}>
    //           <Card style={{ background: "#292C31" }} elevation={4}>
    //             <Grid container justifyContent="space-between">
    //               <Grid itemm xs={1} />
    //               <Grid item xs={5}>
    //                 <TeamCard
    //                   name="Sarah Kumar"
    //                   imageLink={
    //                     "https://media-exp1.licdn.com/dms/image/C5603AQGDS0eRw0moVg/profile-displayphoto-shrink_800_800/0/1612976981911?e=1626912000&v=beta&t=knnacyeM4Lm6Wt9T75H3-RDhiX_5UyatCTWZG68Tu6g"
    //                   }
    //                   position="Co-Founder"
    //                   education="Bachelor of Engineering, Mineral Engineering"
    //                   s
    //                 />
    //               </Grid>
    //               <Grid item xs={5}>
    //                 <TeamCard
    //                   name="Yousif Abduljawad"
    //                   imageLink={
    //                     "https://www.popsci.com/app/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg?width=1440"
    //                   }
    //                   position="Co-Founder"
    //                   education="Bachelor of Engineering, Civil Engineering"
    //                 />
    //               </Grid>
    //               <Grid itemm xs={1} />
    //             </Grid>
    //             <br />
    //             <Grid container justifyContent="space-between">
    //               <Grid item xs={2}>
    //                 <TeamCard
    //                   name="Erike Devilla"
    //                   imageLink={
    //                     "https://www.popsci.com/app/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg?width=1440"
    //                   }
    //                   position="Member"
    //                   education="Bachelor of Commerce, Marketting at Mercedes, Small Business Owner"
    //                 />
    //               </Grid>
    //               <Grid item xs={2}>
    //                 <TeamCard
    //                   name="Wendy Wang"
    //                   imageLink={
    //                     "https://www.popsci.com/app/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg?width=1440"
    //                   }
    //                   position="Member"
    //                   education="Bachelor of Engineering, Mineral Engineering"
    //                 />
    //               </Grid>
    //               <Grid item xs={2}>
    //                 <TeamCard
    //                   name="Erike Devilla"
    //                   imageLink={
    //                     "https://www.popsci.com/app/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg?width=1440"
    //                   }
    //                   position="Member"
    //                   education="Bachelor of Engineering, Mineral Engineering, Minor in businesses"
    //                 />
    //               </Grid>
    //               <Grid item xs={2}>
    //                 <TeamCard
    //                   name="Akin Adewale"
    //                   imageLink={
    //                     "https://media-exp1.licdn.com/dms/image/C4E03AQHvzve31GHMVA/profile-displayphoto-shrink_200_200/0/1552315971974?e=1626912000&v=beta&t=UxJLzhRleg8taHfAkbzC7TEQbIXF9FF81FWGR-psvuE"
    //                   }
    //                   position="Software Engineer / Web Developer"
    //                   education="Bachelor of Engineering, Software Engineering"
    //                 />
    //               </Grid>
    //               <Grid item xs={2}>
    //                 <TeamCard
    //                   name="Priyank Gandhi"
    //                   imageLink={
    //                     "https://www.popsci.com/app/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg?width=1440"
    //                   }
    //                   position="Software Engineer"
    //                   education="Bachelor of Engineering, Marketting at Mercedes"
    //                 />
    //               </Grid>
    //             </Grid>
    //           </Card>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <div>more more moreee</div>
    //   </div>
    // </div>
  );
}
