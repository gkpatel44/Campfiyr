import { Avatar, Badge, FormControl, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { Create, Person } from "@material-ui/icons";
import React, { Component } from "react";
import imageCompression from "browser-image-compression";

const styles = (theme) => ({
  root: {
    minWidth: "20rem",
    margin: "2rem",
  },
  avatar: {
    // marginRight: "2rem",
    "& .MuiIconButton-root": {
      padding: "5px",
      color: "#ABABAB",
      background: "#292C31",
    },
  },
  imagePreview: {
    width: "6rem",
    height: "6rem",
    border: "5px solid #fff",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)",
  },
  pencil: {
    borderRadius: "50%",
  },
});

export class EditAvatar extends Component {
  state = {
    imageInState: null,
  };

  render() {
    const { classes, imageUrl, sendImageBack } = this.props;
    const { imageInState } = this.state;
    const handleImageChange = async (e) => {
      if (e.target.files[0]) {
        const image = e.target.files[0];
        console.log(image);

        console.log("originalFile instanceof Blob", image instanceof Blob); // true
        console.log(`originalFile size ${image.size / 1024 / 1024} MB`);

        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 400,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(image, options);
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${
              (compressedFile.size / 1024 / 1024) * 1000
            } KB`
          ); // smaller than maxSizeMB

          this.setState({
            imageInState: compressedFile,
          });
          sendImageBack(compressedFile);
        } catch (error) {
          console.log("Error during image compression: ", error);
        }
      }
    };

    return (
      <div>
        <FormControl className={classes.avatar}>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={
              <label htmlFor="imageChooser">
                {/*<Paper*/}
                {/*  elevation={3}*/}
                {/*  style={{ zIndex: 1 }}*/}
                {/*  className={classes.pencil}*/}
                {/*>*/}
                <IconButton component="span">
                  <Create />
                </IconButton>
                {/*</Paper>*/}
              </label>
            }
          >
            <Avatar
              src={
                imageInState
                  ? URL.createObjectURL(imageInState)
                  : imageUrl
                  ? imageUrl
                  : ""
              }
              className={classes.imagePreview}
            >
              <Person />
            </Avatar>
          </Badge>

          <input
            id="imageChooser"
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            hidden
          />
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(EditAvatar);
