import React from "react";
// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";

//https://github.com/learnwithparam/logrocket-drag-and-drop

const useStyles = makeStyles((theme) => ({
  dropzone: {
    padding: "16px",
    height: "30vh",
    border: "2px dashed #b4a2ff",
    borderRadius: "5%",
    outline: "none",
    cursor: "pointer",
  },
  dropzoneActive: {
    border: "2px solid #2fd7b5",
    boxShadow: "0 0 10px #2fd7b5",
  },
  dropzoneContent: {
    alignSelf: "center",
    fontSize: "16px",
  },
  textCenter: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
}));

// const getClassName = (className, isActive) => {
//   if (!isActive) return className;
//   return `${className} ${className}-active`;
// };

const Dropzone = ({ onDrop, accept }) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const classes = useStyles();

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  return (
    <div
      className={
        isDragActive
          ? `${classes.dropzoneActive} ${classes.dropzone}`
          : classes.dropzone
      }
      {...getRootProps()}
    >
      <input className="dropzone-input" {...getInputProps()} />
      <div className={classes.textCenter}>
        {isDragActive ? (
          <p className={classes.dropzoneContent}>
            Release to drop the files here
          </p>
        ) : (
          <p className={classes.dropzoneContent}>
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
