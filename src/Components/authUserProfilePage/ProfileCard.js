import {
  Avatar,
  CardActionArea,
  CardMedia,
  withStyles,
  Typography,
  Grid,
  Button,
  Dialog,
} from "@material-ui/core";
import { LocationOn, Person, Phone } from "@material-ui/icons";
import PublicIcon from "@material-ui/icons/Public";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import EditIcon from "@material-ui/icons/Edit";
import React, { Component } from "react";
import { connect } from "react-redux";
// import { pullUserOrBusinessData } from "../../redux/actions/user";
import { mapsPlacesApiKey } from "../../util/config";
import QuickEditProfile from "./QuickEditProfile";

const styles = (theme) => ({
  root: {
    // maxWidth: 500,
    // marginLeft: "2rem",
    // marginRight: "2rem",
  },
  media: {
    minHeight: "185px",
    borderRadius: "8px",
  },
  avatar: {
    width: "4rem",
    height: "4rem",
    position: "relative",
    // top: "-2rem",
    // left: "2rem",
    backgroundColor: "#b4a2ff",
  },
  large: {
    width: "3rem",
    height: "3rem",
  },
  chip: {
    marginLeft: 10,
    marginRight: 5,
  },
  holdTheChips: {
    display: "flex",
    flexWrap: "wrap",
  },
  rightSpace: {
    marginRight: 10,
  },
  link: {
    color: "#b4a2ff",
  },
  clickable: {
    cursor: "pointer",
    fontWeight: "bold",
  },
  headTitle: {
    top: "-50px",
    color: "#FFFFFF",
  },
  dialog: {
    "& .MuiPaper-root": {
      background: "#383D43",
      borderRadius: "8px",
      color: "#ABABAB",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "600px",
      width: "100%",
    },
    "& .MuiDialog-paperScrollPaper": {
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    "& .MuiDialog-paper": {
      margin: "16px",
    },
  },
});

export class ProfileCard extends Component {
  state = {
    dialogState: false,
  };
  componentDidMount() {
    // const { dispatch, userData } = this.props;
    // dispatch(pullUserOrBusinessData(userData?.uid));
  }

  handleDialog = (val) => {
    console.log("Dialog triggered with ", val);
    this.setState({
      dialogState: val,
    });
  };
  render() {
    const { classes, userData, userType } = this.props;
    const { dialogState } = this.state;

    // const handleOperatingHours = () => {
    //   this.setState({
    //     expandHours: !expandHours,
    //   });
    // };

    const buildURL = (str) => {
      if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0) {
        return str;
      } else {
        return "http://" + str;
      }
    };
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // const renderOperatingHours = () => {
    //   daysOfWeek.map((element) => ({ element }));
    // };
    // https://maps.googleapis.com/maps/api/staticmap?center={userData?.coordlat},{userData?.coordlong}&markers=color:red%7Clabel:H%7C{userData?.coordlat},{userData?.coordlong}&zoom=20&size=400x400&key={placesApIKey}\
    return (
      <div style={{ padding: "8px" }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{
            background: "#383D43",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              direction="column"
              style={{
                background: "#292C31",
                borderRadius: "8px",
                padding: "4px",
                marginTop: "30px",
              }}
            >
              <div className="relative w-full flex flex-col justify-center items-center pt-5">
                <div className="z-20 absolute top-1 right-2 flex justify-center items-center cursor-pointer">
                  <Button
                    className="focus:outline-none"
                    onClick={() => {
                      this.handleDialog(true);
                      console.log("Div is clicking itself");
                    }}
                  >
                    <div style={{ color: "#FFFFFF" }}>
                      <EditIcon style={{ width: "16px", height: "16px" }} />
                    </div>
                    <span className="text-xs text-white ml-1">Edit</span>
                  </Button>
                  <Dialog
                    className={classes.dialog}
                    open={dialogState}
                    onClose={() => {
                      this.handleDialog(false);
                      console.log("on close fired");
                    }}
                  >
                    <QuickEditProfile setDialogState={this.handleDialog} />
                  </Dialog>
                </div>
                <div className="z-10 absolute -top-10 right-0 left-0 flex flex-col justify-center items-center">
                  <Avatar
                    alt={userData?.displayName}
                    src={userData?.photoURL || userData?.imageDownloadURL}
                    className={classes.avatar}
                  >
                    <Person />
                  </Avatar>
                </div>
              </div>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.headTitle}
                >
                  {userData ? (
                    userData?.displayname ? (
                      <div className="flex flex-col justify-center items-center">
                        {userData?.displayname}
                        <span
                          className="w-2/3 text-xs text-center"
                          style={{ color: "#ABABAB" }}
                        >
                          {userData?.bio}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center">
                        {userData && userData["business name"]}
                        <span
                          className="w-2/3 text-xs text-center"
                          style={{ color: "#ABABAB" }}
                        >
                          {userData?.bio}
                        </span>
                      </div>
                    )
                  ) : (
                    <p>Loading</p>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    {/* Business accounts */}
                    {userData?.address && (
                      <div
                        className="flex justify-start items-center p-2 text-white"
                        style={{ background: "#383D43", borderRadius: "8px" }}
                      >
                        <div style={{ color: "#7950F3" }}>
                          <LocationOn />
                        </div>
                        <span className="ml-2 text-xs">
                          {userData?.address}
                        </span>
                      </div>
                    )}
                    {/* User accounts */}
                    {userData?.location && (
                      <div
                        className="flex justify-start items-center p-2 text-white"
                        style={{ background: "#383D43", borderRadius: "8px" }}
                      >
                        <div style={{ color: "#7950F3" }}>
                          <LocationOn />
                        </div>
                        <span className="ml-2 text-xs">
                          {userData?.location}
                        </span>
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {userData?.number && (
                      <div
                        className="flex justify-start items-center p-2 text-white"
                        style={{ background: "#383D43", borderRadius: "8px" }}
                      >
                        <div style={{ color: "#7950F3" }}>
                          <a href={`tel:${userData?.number}`}>
                            <Phone />
                          </a>
                        </div>
                        <span className="ml-2 text-xs">{userData?.number}</span>
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {userData?.website ? (
                      <div
                        className="flex justify-start items-center p-2 text-white"
                        style={{ background: "#383D43", borderRadius: "8px" }}
                      >
                        <div style={{ color: "#7950F3" }}>
                          <a
                            href={buildURL(userData?.website)}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <PublicIcon />
                            <Typography component="span" noWrap>
                              <span className="ml-2 text-xs">
                                {userData?.website}
                              </span>{" "}
                            </Typography>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {userData?.customLink && (
                      <div
                        className="flex justify-start items-center p-2 text-white"
                        style={{ background: "#383D43", borderRadius: "8px" }}
                      >
                        <div style={{ color: "#7950F3" }}>
                          <PublicIcon />
                        </div>
                        <Typography component="span" noWrap>
                          <a
                            href={buildURL(userData?.customLink)}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="ml-2 text-xs"
                          >
                            {userData?.customLink}
                          </a>
                        </Typography>
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {userData && userData["Operating Hours"] ? (
                      <div
                        className="flex flex-wrap justify-between items-center p-2 text-white"
                        style={{ background: "#383D43", borderRadius: "8px" }}
                      >
                        <Grid
                          container
                          spacing={2}
                          justifyContent="space-between"
                        >
                          <div
                            className="w-full p-2 flex justify-start items-center"
                            style={{
                              borderColor: "#292C31",
                              borderWidth: "0 0 1px 0",
                            }}
                          >
                            <div style={{ color: "#7950F3" }}>
                              <WatchLaterIcon />
                            </div>
                            <span className="ml-2 text-xs">
                              View Operating Info
                            </span>
                          </div>
                          {daysOfWeek.map((day) => (
                            <Grid
                              item
                              xs={6}
                              key={day}
                              className="flex flex-col justify-center items-center"
                              style={{ padding: "3px" }}
                            >
                              <span className="text-xs">{day} :</span>
                              {userData &&
                              userData["Operating Hours"] &&
                              userData["Operating Hours"][`${day} Start`] ? ( //do they have operating hours filled?
                                userData["Operating Hours"][`${day} Start`] === //if so iterate all hours and render
                                "closed" ? ( // are they closed?
                                  <span
                                    className="text-xs"
                                    style={{ color: "white" }}
                                  >
                                    -{" "}
                                  </span>
                                ) : (
                                  <span
                                    className="text-xs"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {
                                      userData["Operating Hours"][
                                        `${day} Start`
                                      ]
                                    }{" "}
                                    :{" "}
                                    {userData["Operating Hours"][`${day} End`]}
                                  </span>
                                )
                              ) : (
                                "  -"
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    className="relative"
                    style={{ minHeight: "200px" }}
                  >
                    <div
                      className="absolute top-0 right-0 bottom-0 left-0"
                      style={{ inset: "8px" }}
                    >
                      <CardActionArea
                        href={`https://maps.google.com/?q=${userData.coordlat},${userData.coordlong}`}
                        target="_blank"
                      >
                        <CardMedia
                          className={classes.media}
                          // style={{ backgroundSize: "contain" }}
                          image={
                            userType === "business"
                              ? `https://maps.googleapis.com/maps/api/staticmap?center=${userData.coordlat},${userData.coordlong}&markers=color:red%7C${userData.coordlat},${userData.coordlong}&zoom=18&size=700x450&key=${mapsPlacesApiKey}`
                              : "https://images.unsplash.com/photo-1605940169841-60884072a854?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                          }
                        />
                      </CardActionArea>
                      {/* <MapContainer
                        location={{
                          lat: userData?.coordlat,
                          lng: userData?.coordlong,
                        }}
                      /> */}
                      {/* TODO: consider replacing map container with a static map. no reason to have a whole map showing up  */}
                      {/* <CardMedia
                        className={classes.media}
                        image={
                          userType === "business"
                            ? `https://maps.googleapis.com/maps/api/staticmap?center=${userData?.coordlat},${userData?.coordlong}&markers=color:red%7C${userData?.coordlat},${userData?.coordlong}&zoom=18&size=700x450&key=${mapsPlacesApiKey}`
                            : "https://images.unsplash.com/photo-1605940169841-60884072a854?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                        }
                      ></CardMedia> */}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.auth.user,
    userData: state.auth.userData,
    userType: state.auth.userType,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(ProfileCard));

// <Card>
//   <CardActionArea
//     href={`https://maps.google.com/?q=${userData?.coordlat},${userData?.coordlong}`}
//     target="_blank"
//   >
//     <CardMedia
//       className={classes.media}
//       image={
//         userType === "business"
//           ? `https://maps.googleapis.com/maps/api/staticmap?center=${userData?.coordlat},${userData?.coordlong}&markers=color:red%7C${userData?.coordlat},${userData?.coordlong}&zoom=18&size=700x450&key=${mapsPlacesApiKey}`
//           : "https://images.unsplash.com/photo-1605940169841-60884072a854?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
//       }
//     ></CardMedia>
//   </CardActionArea>
//   <Avatar
//     alt={userData?.displayName}
//     src={userData?.photoURL || userData?.imageDownloadURL}
//     className={classes.avatar}
//   >
//     <Person />
//   </Avatar>
//   <CardContent>
//     <Typography gutterBottom variant="h5" component="h2">
//       {userData ? (
//         userData?.displayname ? (
//           userData?.displayname
//         ) : (
//           <div>
//             {userData["business name"]}{" "}
//             <Chip
//               label={userData?.main_category}
//               className={classes.chip}
//             />{" "}
//           </div>
//         )
//       ) : (
//         <p>Loading</p>
//       )}
//     </Typography>
//     <Typography variant="body2" color="textSecondary" component="div">
//       {userType === "business" ? (
//         <span className={classes.holdTheChips}>
//                   {userData?.address ? (
//                     <span className={classes.rightSpace}>
//                       <LocationOn /> {userData?.address}
//                     </span>
//                   ) : (
//                     <span></span>
//                   )}
//           {userData?.number ? (
//             <span className={classes.rightSpace}>
//                       <a href={`tel:${userData?.number}`}>
//                         <Phone /> {userData?.number}
//                       </a>
//                     </span>
//           ) : (
//             <span>/</span>
//           )}
//                 </span>
//       ) : (
//         <div>
//           {userData?.location ? (
//             <div className={classes.rightSpace}>
//               <LocationOn /> {userData?.location}
//             </div>
//           ) : (
//             <span></span>
//           )}
//         </div>
//       )}
//       {userData?.website ? (
//         <div className={classes.rightSpace}>
//           <Language />
//           <a
//             href={buildURL(userData?.website)}
//             rel="noopener noreferrer"
//             target="_blank"
//             className={classes.link}
//           >
//             {userData?.website}
//           </a>
//         </div>
//       ) : (
//         <span></span>
//       )}
//     </Typography>
//     <br />
//     <Typography variant="subtitle2">
//       {userType === "client" ? userData?.bio : userData?.bio}
//     </Typography>
//     {/* <Typography component="body2" variant="subtitle2">
//               {userData ? userData?.email : <p>Loading</p>}
//             </Typography> */}
//     <br />
//     {userType === "business" ? (
//       <Typography
//         variant="button"
//         display="block"
//         onClick={handleOperatingHours}
//         className={classes.clickable}
//       >
//         Operating hours {expandHours ? <ExpandLess /> : <ExpandMore />}
//         <Collapse in={expandHours} timeout="auto" unmountOnExit>
//           {daysOfWeek.map((day) => (
//             <div key={day}>
//               {day} :{" "}
//               {userData["Operating Hours"] &&
//               userData["Operating Hours"][`${day} Start`] ? ( //do they have operating hours filled?
//                 userData["Operating Hours"][`${day} Start`] === //if so iterate all hours and render
//                 "closed" ? ( // are they closed?
//                   <span style={{ color: "red" }}>closed </span>
//                 ) : (
//                   <span>
//                             {userData["Operating Hours"][`${day} Start`]} :{" "}
//                     {userData["Operating Hours"][`${day} End`]}
//                           </span>
//                 )
//               ) : (
//                 "  -"
//               )}
//             </div>
//           ))}
//         </Collapse>
//       </Typography>
//     ) : (
//       <span></span>
//     )}
//   </CardContent>
//   <CardActions disableSpacing>
//     {/* <IconButton aria-label="add to favorites" hidden>
//                 <AddCircleIcon className={classes.large} />
//                 <Typography gutterBottom variant="body2" component="h2">
//                   Add to Album
//                 </Typography>
//               </IconButton> */}
//   </CardActions>
//   <Grid container spacing={4} justifyContent="center">
//     <Grid item xs={6}>
//       <Button
//         variant="outlined"
//         color="primary"
//         onClick={() => {
//           handleDialog(true);
//         }}
//         style={{ marginBottom: 5 }}
//       >
//         Edit Profile
//       </Button>
//       <Dialog
//         open={dialogState}
//         onClose={() => {
//           handleDialog(false);
//         }}
//       >
//         <QuickEditProfile setDialogState={handleDialog} />
//       </Dialog>
//     </Grid>
//   </Grid>
// </Card>
