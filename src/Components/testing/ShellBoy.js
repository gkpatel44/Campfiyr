//The purpose of this component is nothing, i simply use it for coverting class based components to functional components then delete after
// think of it as a boilerplate
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { signupUserAndThen } from "../../redux/actions";
import { minsTo_HourMin } from "../../util/util";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function ShellBoy(props) {
  const { signupUserAndThen } = props;
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  return (
    <div>
      <LinearProgress color="secondary" />
      <Button
        onClick={() => {
          signupUserAndThen("akin.pjadewale@yahoo.com", "Hello!23")
            .then(() => {
              console.log("it got to the .then");
            })
            .catch((err) => {
              console.log("There was an error");
              console.log(err);
            });
        }}
      >
        BUTTON TO TRIGGER LOGIN GO BRRR
      </Button>
      <Button
        onClick={() => {
          console.log(minsTo_HourMin(new Date().getTimezoneOffset()));
          console.log(minsTo_HourMin(300));
          console.log(minsTo_HourMin(-300));
        }}
      >
        Check Timezone checker
      </Button>
    </div>
  );
}
const mapDispatchToProps = { signupUserAndThen };

export default connect(null, mapDispatchToProps)(ShellBoy);
