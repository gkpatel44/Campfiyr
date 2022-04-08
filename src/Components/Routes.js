import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "../util/ProtectedRoute";
// import Home from "./Home";
import UserSignUp from "./auth/userSignUp/UserSignUp";
import Landing from "../pages/Landing";
import ProfilePage from "../pages/ProfilePage";
import RandomContent from "./testing/RandomContent";
import Dashboard from "../pages/Dashboard";
import BusinessLogin from "./auth/BusinessLogin";
import UserPage from "../pages/UserPage";
import SingleEvent from "../pages/SingleEvent";
import Settings from "../pages/Settings";
import SurpriseEvent from "../pages/SurpriseEvent";
import FunctionalComp from "./testing/FunctionalComp";
import { BusinessSignUp } from "./auth/businessSignUp/BusinessSignUp";
import ShellBoy from "./testing/ShellBoy";
import Login from "../pages/Login";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import UserLogin from "./auth/UserLogin";
import Search from "../pages/Search/Search";
import ProductDisplay from "./reusable/ProductDisplay";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

function Routes(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      {/* <Route path="/test" component={RandomContent} /> */}
      {/* Notice 'exact' keyword */}
      {/* <Route path="/" exact component={isAuthenticated ? Dashboard : Landing} /> */}
      <Route path="/" exact component={Landing} />

      {/*<Route path="/login" component={Login} />*/}
      <Route
        path="/login"
        render={() => (
          <Login>
            <UserLogin
              location={{
                pathname: "/login",
                search: "",
                hash: "",
                state: undefined,
              }}
            />
          </Login>
        )}
      />
      <Route path="/businesslogin" component={BusinessLogin} />
      {/*<Route path="/signup" component={UserSignUp} />*/}
      <Route
        path="/signup"
        render={() => (
          <Login>
            <UserSignUp />
          </Login>
        )}
      />
      {/*<Route path="/businessSignup" component={BusinessSignUp} />*/}
      <Route
        path="/businessSignup"
        render={() => (
          <Login>
            <BusinessSignUp />
          </Login>
        )}
      />
      <Route path="/dashboard" component={Dashboard} />
      <Route
        path="/event/:uid/:eventId"
        // component={SingleEvent}
        render={(props) => (
          <SingleEvent key={Date.now()} {...props}></SingleEvent>
        )}
      />
      <Route
        path="/user/:uid"
        render={(props) => <UserPage key={Date.now()} {...props}></UserPage>}
      />
      <Route
        path="/settings"
        render={(props) => <Settings key={Date.now()} {...props}></Settings>}
      />
      <Route path="/about" component={AboutUs} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/blog" component={FunctionalComp} />
      <Route path="/surpriseme" component={SurpriseEvent} />
      <Route path="/productDetails" component={ProductDisplay}/>
      <Route path="/Cart" component={Cart}/>
      <Route path="/checkout" component={Checkout}/>
        
      <Route path="/search/:type/" component={Search} />
      {/* <Route path="/:uid" component={UserPage} />   if i absolutely must have the application behave like twitter  (twitter.com/beyonce)*/}

      <Route path="/test/:uid/" component={RandomContent} />
      <Route path="/test/:uid/" component={RandomContent} />
      <Route path="/test3" component={ShellBoy} />

      <ProtectedRoute
        exact
        path="/test"
        component={RandomContent}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/* <ProtectedRoute
        exact
        path="/dashboard"
        component={Dashboard}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      /> */}
      <ProtectedRoute
        exact
        path="/profilepage"
        component={ProfilePage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      {/* To be extended */}
      <Route render={() => <h1>404: page not found</h1>} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(Routes);
