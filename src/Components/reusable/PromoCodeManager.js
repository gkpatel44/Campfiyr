import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { FB_FUNCTIONS_VALIDATE_PROMO } from "../../util/keywords";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: "0 8px 8px 0",
    color: "#FFFFFF",
    background: "#6f7071",
  },
  // customInput: {
  //   background: "#292C31",
  //   borderRadius: "10px 0 0 10px",
  //   "& .MuiOutlinedInput-input": {
  //     padding: 0
  //   },
  //   "& .MuiOutlinedInput-input:-webkit-autofill": {
  //     WebkitBoxShadow: "0 0 0 1000px #292C31 inset",
  //     WebkitTextFillColor: "#ABABAB",
  //     paddingLeft: "10px"
  //   },
  //   "& .makeStyles-customInput-64 .MuiOutlinedInput-input": {
  //     padding: 0,
  //     fontSize: "12px",
  //     height: "30px",
  //   },
  //   "& .MuiInputBase-input": {
  //     height: "30px",
  //     paddingLeft: "10px",
  //     color: "#ABABAB",
  //     fontSize: "12px"
  //   },
  //   "& .MuiInputLabel-formControl": {
  //     top: "-10px",
  //     fontSize: "12px",
  //     color: "#ABABAB",
  //   },
  //   "& .MuiOutlinedInput-root": {
  //     borderRadius: "10px 0 0 10px",
  //   },
  //   "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
  //     transform: "translate(14px, 5px) scale(0.75)",
  //   },
  //   "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //     borderColor: "#ABABAB",
  //   },
  //   '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
  //     padding: 0,
  //     paddingLeft: "10px",
  //   },
  //   '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
  //     padding: 0
  //   },
  //   "& .MuiSvgIcon-root": {
  //     color: "#ABABAB"
  //   },
  //   "& .PrivateNotchedOutline-root-34": {
  //     borderWidth: 0
  //   },
  // },
  customInput: {
    background: "#292C31",
    borderColor: "#292C31",
    borderRadius: "8px 0 0 8px",
    "& .MuiOutlinedInput-input": {
      padding: 0,
    },
    "& .MuiOutlinedInput-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #292C31 inset",
      WebkitTextFillColor: "#ABABAB",
      paddingLeft: "10px",
    },
    "& .makeStyles-customInput-64 .MuiOutlinedInput-input": {
      padding: 0,
      fontSize: "12px",
      height: "40px",
    },
    "& .MuiInputBase-input": {
      height: "40px",
      paddingLeft: "10px",
      color: "#ABABAB",
      fontSize: "12px",
    },
    "& .MuiInputLabel-formControl": {
      top: "-10px",
      fontSize: "12px",
      color: "#ABABAB",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      borderWidth: 0,
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 22px) scale(1)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, 5px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      // borderColor: "#ABABAB",
      borderWidth: 0,
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      padding: 0,
      paddingLeft: "10px",
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input':
      {
        padding: 0,
      },
    "& .MuiSvgIcon-root": {
      color: "#ABABAB",
    },
    "& .PrivateNotchedOutline-root-34": {
      borderWidth: 0,
    },
    "& .MuiSelect-nativeInput": {
      opacity: 1,
      top: 0,
      borderRadius: "8px 0 0 8px",
      background: "#292C31",
      color: "#ABABAB",
      fontSize: "12px",
      paddingLeft: "10px",
    },
    "& .MuiFormHelperText-contained": {
      color: "#28bf0d",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#f44336",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: 0,
    },
  },
}));
function PromoCodeManager(props) {
  const classes = useStyles();
  const { handleChange, incomingCode } = props;
  const [validPromo, setvalidPromo] = useState({
    status: null,
    msg: null,
    error: null,
    data: { duration_month: null },
  });
  const validatePromoCode = (promoCode) => {
    const { handleExpiryDate } = props;
    axios
      .get(`${FB_FUNCTIONS_VALIDATE_PROMO}/${promoCode}`)
      .then((resp) => {
        setvalidPromo(resp.data);
        if (resp.data.status === 1) {
          const code = resp.data.data;
          handleExpiryDate(code);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setvalidPromo(err.response.data);
        }
        console.log("Fetch err", err);
      });
  };

  return (
    <div>
      <form>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} className="flex">
            <TextField
              className={classes.customInput}
              fullWidth
              label="Promo Code"
              variant="outlined"
              type="text"
              error={validPromo.status === 0}
              value={incomingCode}
              helperText={validPromo.msg}
              onChange={handleChange("promoCode")}
              InputProps={{
                style: { textTransform: "uppercase" },
              }}
            />
            <Button
              style={{ padding: "5px 12px" }}
              disabled={incomingCode === ""}
              onClick={() => {
                // setinternalPromoCode(incomingCode.toUpperCase());
                validatePromoCode(incomingCode.toUpperCase());
              }}
              color="primary"
              variant="contained"
              className={`${classes.button} focus:outline-none`}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

PromoCodeManager.propTypes = {
  handleChange: PropTypes.func.isRequired,
  incomingCode: PropTypes.string.isRequired,
  handleExpiryDate: PropTypes.func.isRequired,
};

export default PromoCodeManager;
