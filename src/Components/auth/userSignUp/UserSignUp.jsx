import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  assignUserType,
  generateUserData,
  // signupUser,
  signupUserAndThen,
} from "../../../redux/actions";
import BasicInformation from "./BasicInformation";
import Confirm from "./Confirm";
import Success from "./Success";
// import UserInterests from "./UserInterests";

class UserSignUp extends Component {
  state = {
    step: 1,
    err: "",
    email: "",
    displayname: "",
    firstname: "",
    lastname: "",
    user_type: "",
    birthdate: "",
    rank_prefer: "",
    rank_weekend: "",
    rank_quick_bite: "",
    rank_eat_out: "",
    password: "",
    imageDownloadURL:"",
    image:null
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

  handleUpdateState = (input) => {
    this.setState({ ...input });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleImageChange=(image)=>{
    this.setState({
      image:image
    })

  }

  /** Creates user with firebase auth and returns appropriate errors if any
   *
   * @param {string} email
   * @param {string} password
   */
  createUserAccountUserPassHandler = async (email, password) => {
    // event.preventDefault();
    try {
      // dispatch(signupUser(email, password));
      /* On Thursday April 29th 2020, i (Akin) converted the above {dispatch(signupUser(email, password));} from a regular dispatch
       * to an async dispatch so i can permit certain actions on success and disallow actions on failure.
        official documentation https://react-redux.js.org/api/connect#object-shorthand-form 
      */
      this.props
        .signupUserAndThen(email, password)
        .then(() => {
          console.log("User signup successful! Creating user document...");
          this.continueCreatingUser();
        })
        .catch((err) => {
          console.log("There was an error");
          console.log(err);
        });
    } catch (error) {
      this.setState({ err: "Error Signing up with email and password" });
      console.log("Error creating User: ", error);
    }
  };

  continueCreatingUser = () => {
    const { dispatch } = this.props;
    const {
      // displayname,
      firstname,
      lastname,
      err,
      email,
      user_type,
      birthdate,
      imageDownloadURL,
      image

      // rank_prefer,
      // rank_weekend,
      // rank_quick_bite,
      // rank_eat_out,
    } = this.state;


    let newBirthdate = new Date(birthdate);


    dispatch(assignUserType("client"));
    dispatch(
      generateUserData("client", {
        displayname: firstname + " " + lastname,
        firstname,
        lastname,
        err,
        email,
        user_type,
        birthdate: newBirthdate,
        bio: "",
        businessCanUseStory: true,
        followers: 0,
        following: 0,
        goingPostsToStory: true,
        imageDownloadURL,//: "Firebase storage ma add krvani image and download url pass krvani thase aama.",
        map_displays: true,
        publicAccount: false,
        image


        // rank_prefer,
        // rank_weekend,
        // rank_quick_bite,
        // rank_eat_out,
      })
    );
  };


 


  // handleRank = (rank, ranking) => {
  //   this.setState({
  //     [rank]: ranking,
  //   });
  // };

  // handleUpdateState = (input) => {    
  //   this.setState({ ...input });
  // };

  render() {
    const { step } = this.state;
    const {
      email,
      displayname,
      firstname,
      lastname,
      user_type,
      birthdate,
      rank_prefer,
      rank_weekend,
      rank_quick_bite,
      rank_eat_out,
      password,
      imageDownloadURL,
      image,
    } = this.state;
    const values = {
      email,
      displayname,
      firstname,
      lastname,
      user_type,
      birthdate,
      rank_prefer,
      rank_weekend,
      rank_quick_bite,
      rank_eat_out,
      password,
      imageDownloadURL,
      image,
      //Below two are static (from my understanding at least)
      social_id: "",
      login_type: "NORMAL",
    };

    switch (step) {
      case 1:
        return (
          <BasicInformation
            location={{
              pathname: "/signup",
              search: "",
              hash: "",
              state: undefined,
            }}
            nextStep={this.nextStep}
            handleUpdateState={this.handleUpdateState}
            handleChange={this.handleChange}
            handleAddress={this.handleAddress}
            handlePhone={this.handlePhone}
            handleImageChange={this.handleImageChange}
            values={values}
            backtrackTo={this.backtrackTo}
          />
        );
      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            createUserAccountUserPassHandler={
              this.createUserAccountUserPassHandler
            }
            values={values}
            handleUpdateState={this.handleUpdateState}
            backtrackTo={this.backtrackTo}
          />
          // <UserInterests
          //   nextStep={this.nextStep}
          //   prevStep={this.prevStep}
          //   handleChange={this.handleChange}
          //   handleRank={this.handleRank}
          //   values={values}
          // />
        );
      case 3:
        return (
          <Success backtrackTo={this.backtrackTo} />
          // <Confirm
          //   nextStep={this.nextStep}
          //   prevStep={this.prevStep}
          //   handleChange={this.handleChange}
          //   createUserAccountUserPassHandler={
          //     this.createUserAccountUserPassHandler
          //   }
          //   values={values}
          //   handleUpdateState={this.handleUpdateState}
          // />
        );
      case 4:
        return <></>;
      default:
        console.log("Oh yikes, how did you get here?");
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUp);
