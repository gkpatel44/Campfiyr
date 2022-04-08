import {
  Avatar,
  CardActionArea,
  CardMedia,
  withStyles,
  CardContent,
  Grid,
  Tooltip,
} from "@material-ui/core";
import {
  Language,
  LocationOn,
  Person,
  Star,
  Explore,
  PersonAdd,
} from "@material-ui/icons";
import PhotoIcon from "@material-ui/icons/Photo";
import React, { Component } from "react";
import { connect } from "react-redux";
import { mapsPlacesApiKey } from "../../util/config";
import { BUSINESSNAME, EVENT_COLLECTIONS } from "../../util/keywords";
import { WatchLater, Close } from "@material-ui/icons";
import { Dialog, DialogTitle, IconButton } from "@material-ui/core";
import { processAlbumData } from "../../util/DialogModalUtil";
import MuiDialogContent from "@material-ui/core/DialogContent";
import ModalMediaContent from "../Dialogs/ModalMediaContent";

const styles = (theme) => ({
  media: {
    minHeight: "200px",
    borderRadius: "8px",
  },
  avatar: {
    width: "4rem",
    height: "4rem",
    top: "-30px",
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
  cardMedia: {
    width: "100%",
    borderRadius: "8px",
    height: "10rem",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
    width: "100%",
    height: "auto",
    "text-align": "center",
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
  albumCoverImage: {
    opacity: 1,
    transition: ".5s ease",
    "backface-visibility": "hidden",
    "&:hover": {
      opacity: 0.5,
    },
    "text-align": "center",
  },
  dialogWindowContent: {
    width: "100%",
    height: "auto",
    background: "#383D43",
  },
  dialogWindow: {
    "text-align": "center",
    borderRadius: "8px",
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "900px",
      width: "600px",
      borderRadius: "5px",
      background: "#383D43",
    },
    "& .MuiDialog-paper": {
      margin: "10px",
      borderRadius: "5px",
    },
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100%",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export class ProfileCard extends Component {
  state = {
    expandHours: false,
    dialogState: false,
    testIsFriend: false,
    openDialog: false,
    activeAlbum: null,
    gallery: [],
  };

  render() {
    const { classes, userData, isUserABusiness } = this.props;
    const { openDialog, gallery } = this.state;

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

    const handleClose = () => {
      this.setState({ openDialog: false });
      this.setState({ setActiveAlbum: null });
    };

    const DialogContent = withStyles((theme) => ({
      root: {
        padding: theme.spacing(1),
      },
    }))(MuiDialogContent);

    const setActiveAlbum = (event, album) => {
      event.preventDefault();
      this.setState({ openDialog: true });
      this.setState({ activeAlbum: album });
      this.setState({ gallery: null });
      const selectedCoverImageKey = "selectedCoverImage";
      const { [selectedCoverImageKey]: _, ...filteredAlbum } = album.data;
      const response = processAlbumData(filteredAlbum);
      setTimeout(() => {
        if (response) {
          this.setState({ gallery: response });
        }
      }, 2000);
    };

    return (
      <>
        <Dialog
          className={classes.dialogWindow}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
        >
          <DialogTitle>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.dialogWindowContent}>
            <ModalMediaContent content={gallery} />
          </DialogContent>
        </Dialog>
        <div
          style={{
            width: "100%",
            borderRadius: "8px",
            background: "#383D43",
            padding: "16px",
          }}
        >
          {isUserABusiness && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    background: "#292C31",
                    padding: "16px",
                    position: "relative",
                    marginTop: "35px",
                  }}
                >
                  <div className="absolute top-0 right-0 left-0 flex justify-center items-center">
                    <Avatar
                      alt={userData[BUSINESSNAME]}
                      src={userData.photoURL || userData.imageDownloadURL}
                      className={classes.avatar}
                    >
                      <Person />
                    </Avatar>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    {userData ? (
                      <Grid
                        container
                        direction="column"
                        // justifyContent="space-between"
                        alignItems="center"
                      >
                        {userData[BUSINESSNAME] && (
                          <Grid item>
                            <div className="text-2xl font-archivoBlack text-center">
                              {userData[BUSINESSNAME]}
                            </div>
                            {userData.bio && (
                              <div className="text-xs text-center">
                                {userData.bio}
                              </div>
                            )}
                          </Grid>
                        )}
                      </Grid>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    style={{ marginTop: "15px" }}
                  >
                    <Grid item xs={12} md={6}>
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          background: "#383D43",
                          padding: "16px",
                        }}
                        className="flex justify-start items-center"
                      >
                        <LocationOn
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#7950F3",
                          }}
                        />
                        <div style={{ fontSize: "12px", marginLeft: "10px" }}>
                          {userData?.address || "Earth"}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          background: "#383D43",
                          padding: "16px",
                        }}
                        className="flex justify-start items-center"
                      >
                        <Tooltip title="Followers">
                          <Star
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#7950F3",
                            }}
                          />
                        </Tooltip>
                        <div
                          style={{ fontSize: "12px", marginLeft: "10px" }}
                          className="flex whitespace-nowrap"
                        >
                          Favourites: {userData.followers}
                        </div>
                      </div>
                    </Grid>
                    {userData && userData.website && userData.customLink ? (
                      <>
                        <Grid item xs={12} md={6}>
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              background: "#383D43",
                              padding: "16px",
                            }}
                            className="flex justify-start items-center"
                          >
                            <div className="mr-4">
                              <a
                                href={buildURL(userData.website)}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <Tooltip title={userData.website}>
                                  <Language
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "#7950F3",
                                      cursor: "pointer",
                                    }}
                                  />
                                </Tooltip>
                                <span className="ml-2 text-xs">
                                  {userData.website}
                                </span>
                              </a>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                              background: "#383D43",
                              padding: "16px",
                            }}
                            className="flex justify-start items-center"
                          >
                            <div className="mr-4">
                              <a
                                href={buildURL(userData.customLink)}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <Tooltip title={userData.customLink}>
                                  <Language
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      color: "#7950F3",
                                      cursor: "pointer",
                                    }}
                                  />
                                </Tooltip>
                                <span className="ml-2 text-xs">
                                  {userData.customLink}
                                </span>
                              </a>
                            </div>
                          </div>
                        </Grid>
                      </>
                    ) : userData.website ? (
                      <Grid item xs={12}>
                        <div
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            background: "#383D43",
                            padding: "16px",
                          }}
                          className="flex justify-start items-center"
                        >
                          <div className="mr-4">
                            <a
                              href={buildURL(userData.website)}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="flex justifyContentcenter items-center"
                            >
                              <Tooltip title={userData.website}>
                                <Language
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#7950F3",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                              <span
                                style={{ fontSize: "12px", marginLeft: "10px" }}
                              >
                                {userData.website}
                              </span>
                            </a>
                          </div>
                        </div>
                      </Grid>
                    ) : null}
                    <Grid item xs={12} md={6} style={{ display: "flex" }}>
                      {userData && userData["Operating Hours"] && (
                        <div
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            background: "#383D43",
                            padding: "16px",
                          }}
                          className="flex flex-col justify-start items-center"
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
                                marginBottom: "8px",
                              }}
                            >
                              <WatchLater
                                style={{
                                  color: "#7950F3",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                              <span className="ml-2 text-xs">
                                View Operating Info
                              </span>
                            </div>
                            {daysOfWeek.map((day) => (
                              <Grid
                                item
                                xs={6}
                                key={day}
                                className="flex flex-col justify-center items-center "
                                // style={{ padding: "6px 3px  3px" }}
                              >
                                <span className="text-xs">{day} :</span>
                                {userData &&
                                userData["Operating Hours"] &&
                                userData["Operating Hours"][`${day} Start`] ? ( //do they have operating hours filled?
                                  userData["Operating Hours"][
                                    `${day} Start`
                                  ] === //if so iterate all hours and render
                                  "closed" ? ( // are they closed?
                                    <span
                                      className="text-xs w-full text-center font-bold"
                                      style={{
                                        color: "white",
                                        background: "#292C31",
                                        borderRadius: "8px",
                                        padding: "8px",
                                      }}
                                    >
                                      -
                                    </span>
                                  ) : (
                                    <span
                                      className="w-full text-center text-xs"
                                      style={{
                                        fontSize: "9px",
                                        background: "#292C31",
                                        borderRadius: "8px",
                                        padding: "8px",
                                      }}
                                    >
                                      {
                                        userData["Operating Hours"][
                                          `${day} Start`
                                        ]
                                      }{" "}
                                      :{" "}
                                      {
                                        userData["Operating Hours"][
                                          `${day} End`
                                        ]
                                      }
                                    </span>
                                  )
                                ) : (
                                  <span
                                    className="text-xs w-full text-center font-bold"
                                    style={{
                                      color: "#ABABAB",
                                      background: "#292C31",
                                      borderRadius: "8px",
                                      padding: "8px",
                                    }}
                                  >
                                    -
                                  </span>
                                )}
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {userData && (
                        <div
                          style={{
                            borderRadius: "8px",
                            background: "#383D43",
                            padding: "16px",
                          }}
                          className="flex flex-col justify-start items-center"
                        >
                          <Grid
                            container
                            spacing={2}
                            justifyContent="flex-end"
                            alignItems="center"
                            direction="row"
                          >
                            <div
                              className="w-full p-2 flex justify-start items-center"
                              style={{
                                borderColor: "#292C31",
                                borderWidth: "0 0 1px 0",
                                marginBottom: "8px",
                              }}
                            >
                              <Explore
                                style={{
                                  color: "#7950F3",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                              <span className="ml-2 text-xs">On the map</span>
                            </div>
                            <Grid item xs={12}>
                              <div
                                style={{ borderRadius: "8px", width: "100%" }}
                                className="flex flex-col justify-start items-center"
                              >
                                <CardActionArea
                                  href={`https://maps.google.com/?q=${userData.coordlat},${userData.coordlong}`}
                                  target="_blank"
                                >
                                  <CardMedia
                                    className={`${classes.media}`}
                                    style={{
                                      backgroundSize: "cover",
                                      width: "100%",
                                      height: "auto",
                                    }}
                                    image={
                                      // userData.userType === "business"
                                      isUserABusiness
                                        ? `https://maps.googleapis.com/maps/api/staticmap?center=${userData.coordlat},${userData.coordlong}&markers=color:red%7C${userData.coordlat},${userData.coordlong}&zoom=18&size=700x450&key=${mapsPlacesApiKey}`
                                        : null
                                    }
                                  />
                                </CardActionArea>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              {userData && userData[EVENT_COLLECTIONS].length > 0 && (
                <Grid item xs={12} md={12}>
                  <div
                    style={{
                      borderRadius: "8px",
                      background: "#383D43",
                      padding: "16px",
                    }}
                    className="flex flex-col justify-start items-center"
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent="flex-start"
                      alignItems="center"
                      direction="row"
                    >
                      <div
                        className="w-full p-2 flex justify-start items-center"
                        style={{
                          borderColor: "#292C31",
                          borderWidth: "0 0 1px 0",
                          marginBottom: "8px",
                        }}
                      >
                        <PhotoIcon
                          style={{
                            color: "#7950F3",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <span className="ml-2 text-xs">Album</span>
                      </div>
                      {userData[EVENT_COLLECTIONS] &&
                        userData[EVENT_COLLECTIONS].map((album) => {
                          return (
                            <Grid item xs={6} md={3}>
                              <div
                                style={{ borderRadius: "8px", width: "100%" }}
                                className={`"flex flex-col justify-start items-center" anotherClass ${classes.albumCoverImage}`}
                              >
                                <CardMedia
                                  className={`${classes.cardMedia} anotherClass ${classes.clickable}`}
                                  image={album.data.selectedCoverImage || ""}
                                  key={album.album_name}
                                  title={album.album_name}
                                  onClick={(event) =>
                                    setActiveAlbum(event, album)
                                  }
                                />
                                <CardContent>
                                  <span className="text-xs">
                                    {album.album_name}
                                  </span>
                                </CardContent>
                              </div>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </div>
                </Grid>
              )}
            </Grid>
          )}
          {!isUserABusiness && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <div
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    background: "#292C31",
                    padding: "16px",
                    position: "relative",
                    marginTop: "35px",
                  }}
                >
                  <div className="absolute top-0 right-0 left-0 flex justify-center items-center">
                    <Avatar
                      alt={userData.displayname}
                      src={userData.photoURL || userData.imageDownloadURL}
                      className={classes.avatar}
                    >
                      <Person />
                    </Avatar>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    {userData ? (
                      <Grid
                        container
                        direction="column"
                        // justifyContent="space-between"
                        alignItems="center"
                      >
                        {userData.displayname && (
                          <Grid item>
                            <div className="text-2xl font-archivoBlack">
                              {userData.displayname}
                            </div>
                            {userData.bio && (
                              <div className="text-xs text-center">
                                {userData.bio}
                              </div>
                            )}
                          </Grid>
                        )}
                      </Grid>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    style={{ marginTop: "15px" }}
                  >
                    <Grid item xs={12} md={6}>
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          background: "#383D43",
                          padding: "16px",
                        }}
                        className="flex justify-start items-center"
                      >
                        <LocationOn
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#7950F3",
                          }}
                        />
                        <div style={{ fontSize: "12px", marginLeft: "10px" }}>
                          {userData?.location || "Earth"}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          background: "#383D43",
                          padding: "16px",
                        }}
                        className="flex justify-start items-center"
                      >
                        {this.state.testIsFriend ? (
                          <Person
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#7950F3",
                            }}
                          />
                        ) : (
                          <PersonAdd
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#7950F3",
                            }}
                          />
                        )}
                        <div
                          style={{ fontSize: "12px", marginLeft: "10px" }}
                          className="flex whitespace-nowrap"
                        >
                          {this.state.testIsFriend
                            ? "Already friends"
                            : "Not friends yet"}
                        </div>
                      </div>
                    </Grid>
                    {userData && (userData.website || userData.customLink) ? (
                      <Grid item xs={12}>
                        <div
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            background: "#383D43",
                            padding: "16px",
                          }}
                          className="flex justify-start items-center"
                        >
                          <div className="mr-4">
                            <a
                              href={buildURL(userData.website)}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Tooltip title={userData.website}>
                                <Language
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    color: "#7950F3",
                                    cursor: "pointer",
                                  }}
                                />
                              </Tooltip>
                            </a>
                          </div>
                        </div>
                      </Grid>
                    ) : null}
                    <Grid item xs={12} md={6}>
                      {userData && (
                        <div
                          style={{
                            borderRadius: "8px",
                            background: "#383D43",
                            padding: "16px",
                          }}
                          className="flex flex-col justify-start items-center"
                        >
                          <Grid
                            container
                            spacing={2}
                            justifyContent="flex-end"
                            alignItems="center"
                            direction="row"
                          >
                            <div
                              className="w-full p-2 flex justify-start items-center"
                              style={{
                                borderColor: "#292C31",
                                borderWidth: "0 0 1px 0",
                                marginBottom: "8px",
                              }}
                            >
                              <Explore
                                style={{
                                  color: "#7950F3",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                              <span className="ml-2 text-xs">On the map</span>
                            </div>
                            <Grid item xs={12}>
                              <div
                                style={{ borderRadius: "8px", width: "100%" }}
                                className="flex flex-col justify-start items-center"
                              >
                                <CardMedia
                                  className={`${classes.media}`}
                                  style={{
                                    backgroundSize: "cover",
                                    width: "100%",
                                    height: "auto",
                                  }}
                                  image={
                                    // userData.userType === "business"
                                    isUserABusiness
                                      ? `https://maps.googleapis.com/maps/api/staticmap?center=${userData.coordlat},${userData.coordlong}&markers=color:red%7C${userData.coordlat},${userData.coordlong}&zoom=18&size=700x450&key=${mapsPlacesApiKey}`
                                      : null
                                  }
                                />
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
    isUserABusiness: state.user.isUserABusiness,
    authUserData: state.auth.userData,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(ProfileCard));
