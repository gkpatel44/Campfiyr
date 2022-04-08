import React, { Component } from "react";
import {
  assignUserType,
  generateUserData,
  // signupUser,
  signupUserAndThen,
} from "../../../redux/actions";
import { connect } from "react-redux";

import BasicInformation from "./BasicInformation";
import BusinessHours from "./BusinessHours";
import Category from "./Category";
import Confirm from "./Confirm";
import Success from "./Success";

import imageCompression from "browser-image-compression";
import { addMonths } from "../../../util/util";
// import { Button } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { firebaseAnalytics } from "../../../firebase/firebase";

export class BusinessSignUp extends Component {
  state = {
    step: 1,
    promoCode: "",
    businessName: "",
    country: "",
    province: "",
    address: "",
    coordlat: 0,
    coordlong: 0,
    phoneNumber: "",
    email: "",
    expirydate: new Date(), //TODO: May need to expand this
    city: "Toronto",
    error: "",
    image: null,
    imageUrl: "",
    password: "",
    main_category: [],
    sub_category1: [],
    sub_category2: [],
    sub_category3: [],
    categoryState: -1,
    "Operating Hours": {
      // I promise you this was not my idea, i'm just coding as i see
      "Operating Hours": {},
    },
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };
  backtrackTo = (where) => {
    // const { step } = this.state;
    this.setState({
      step: where,
    });
  };
  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleAddress = (addy) => {
    this.setState({ address: addy });
  };

  handleLocation = (loc) => {
    const { lat, lng } = loc;
    this.setState({
      coordlat: lat,
      coordlong: lng,
    });
  };

  handlePhone = (phone) => {
    this.setState({ phoneNumber: phone });
  };

  handleUpdateState = (input) => {
    this.setState({ ...input });
  };

  handleImageChange = async (e) => {
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
          `compressedFile size ${(compressedFile.size / 1024 / 1024) * 1000} KB`
        ); // smaller than maxSizeMB

        this.setState({
          image: compressedFile,
        });
      } catch (error) {
        console.log("Error during image compression: ", error);
      }
    }
  };

  handleCategory = (mainOrSub, cat) => {
    switch (mainOrSub) {
      case 0:
        this.setState({
          categoryState: cat,
        });
        break;
      case 1:
        this.setState({
          main_category: [cat],
        });
        break;
      case 2:
        this.setState({
          sub_category1: [cat],
        });
        break;
      case 3:
        this.setState({
          sub_category2: [cat],
        });
        break;
      case 4:
        this.setState({
          sub_category3: [cat],
        });
        break;
      default:
        break;
    }
  };

  handleTime = (when, what) => {
    if (what === "skipped") {
      this.setState({
        "Operating Hours": {
          "Operating Hours": {},
          skipped: true,
        },
      });
    } else {
      this.setState((prevState) => ({
        "Operating Hours": {
          // I promise you this was not my idea, i'm just coding as i see
          "Operating Hours": {
            ...prevState["Operating Hours"]["Operating Hours"],
            [when]: what,
          },
        },
      }));
    }
  };

  handleExpiryDate = (data) => {
    var expiry = new Date();

    if (data.type === "duration") {
      expiry = addMonths(expiry, data.duration_month);
    } else if (data.type === "flat") {
      expiry = new Date(data.expires);
    }
    this.setState({ expirydate: expiry, promoCode: data.id });
  };
  render() {
    const { step, err } = this.state;
    const { dispatch } = this.props;
    const { signupUserAndThen } = this.props; // Added Wednesday April 21st 2021

    const {
      promoCode,
      businessName,
      country,
      province,
      email,
      expirydate,
      address,
      phoneNumber,
      city,
      image,
      imageUrl,
      main_category,
      sub_category1,
      sub_category2,
      sub_category3,
      categoryState,
      password,
      coordlat,
      coordlong,
    } = this.state;
    const operatingHours = this.state["Operating Hours"];
    const values = {
      promoCode,
      businessName,
      country,
      province,
      email,
      expirydate,
      address,
      phoneNumber,
      city,
      coordlat,
      coordlong,
      image,
      imageUrl,
      main_category,
      sub_category1,
      sub_category2,
      sub_category3,
      categoryState,
      operatingHours,
      password,
    };
    //TODO: IMPLEMENT image size reducing
    const createBusinessAccountUserPassHandler = async (
      // event,
      email,
      password
    ) => {
      // event.preventDefault();
      try {
        // dispatch(signupUser(email, password));
        /* On Wednesday April 21st 2020, i converted the above {dispatch(signupUser(email, password));} from a regular dispatch
         * to an async dispatch so i can permit certain actions on success and disallow actions on failure.
          official documentation https://react-redux.js.org/api/connect#object-shorthand-form 
        */
        signupUserAndThen(email, password)
          .then(() => {
            console.log("User signup successful! Creating user document...");
            continueCreatingUser();
            firebaseAnalytics.logEvent("business_signup", {
              complete: true,
            });
          })
          .catch((err) => {
            console.log("There was an error");
            console.log(err);
          });
      } catch (error) {
        this.setState({ [err]: "Error Signing up with email and password" });
        console.log("Error creating business: ", error);
      }
    };
    const continueCreatingUser = () => {
      dispatch(assignUserType("business"));
      dispatch(
        generateUserData("business", {
          address,
          "business name": businessName,
          city,
          coordlat,
          coordlong,
          country,
          followers: 0,
          image,
          main_category,
          number: phoneNumber,
          sub_category1,
          sub_category2,
          sub_category3,
          operatingHours,
          expirydate,
          promoCode,
        })
      );
    };
    switch (step) {
      case 1:
        return (
          <BasicInformation
            location={{
              pathname: "/businessSignup",
              search: "",
              hash: "",
              state: undefined,
            }}
            nextStep={this.nextStep}
            handleUpdateState={this.handleUpdateState}
            handleChange={this.handleChange}
            handleAddress={this.handleAddress}
            handleLocation={this.handleLocation}
            handlePhone={this.handlePhone}
            handleImageChange={this.handleImageChange}
            values={values}
            backtrackTo={this.backtrackTo}
            key={"BusinessSignupBasicInformation"}
          />
        );
      case 2:
        return (
          <Category
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleCategory={this.handleCategory}
            handleUpdateState={this.handleUpdateState}
            values={values}
            backtrackTo={this.backtrackTo}
            key={"BusinessSignupCategory"}
          />
        );
      case 3:
        return (
          <BusinessHours
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleTime={this.handleTime}
            values={values}
            backtrackTo={this.backtrackTo}
            key={"BusinessSignupBusinessHours"}
          />
        );
      case 4:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleExpiryDate={this.handleExpiryDate}
            handleUpdateState={this.handleUpdateState}
            createBusinessAccountUserPassHandler={
              createBusinessAccountUserPassHandler
            }
            values={values}
            backtrackTo={this.backtrackTo}
            key={"BusinessSignupConfirm"}
          />
        );
      case 5:
        return (
          <Success
            backtrackTo={this.backtrackTo}
            key={"BusinessSignupSuccess"}
          />
        );
      default:
        <div key="BusinessSignupwhoops">something went wrong.</div>;
      // console.log("Oh yikes, how did you get here?");
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    signupError: state.auth.signupError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}
/**
 * This is how you get dispatch back
 * https://react-redux.js.org/using-react-redux/connect-mapdispatch#manually-injecting-dispatch
 * @param {*} dispatch
 * @returns  dispatch ?
 */
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ signupUserAndThen }, dispatch),
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(BusinessSignUp);
