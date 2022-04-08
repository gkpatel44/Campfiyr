import React from "react";
// import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import MuiDialogTitle from "@material-ui/core/DialogTitle";
// import MuiDialogContent from "@material-ui/core/DialogContent";
// import MuiDialogActions from "@material-ui/core/DialogActions";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogCustomised: {
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
}));

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           className={classes.closeButton}
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

export default function ModalCard(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  // const btn = {
  //   FontColor: "#b4a2ff",
  //   backgroundColor: "#fff",
  //   fontFamily: "Nunito",
  //   fontWeight: "700",
  //   margin: "2px",
  //   borderRadius: 25,
  // };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const ComponentPassedIn = props.obj;
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        // style={btn}
        className={`${props.btnStyle} focus:outline-none`}
      >
        {props.text}
      </Button>
      <Dialog
        className={classes.dialogCustomised}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions> */}
        {props.obj}

        {/* <div>
          <Element></Element>
        </div> */}
      </Dialog>
    </div>
  );
}