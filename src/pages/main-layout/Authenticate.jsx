import React from "react";
import { Route } from "react-router-dom";

const Authenticate = ({ component }) => {
  return (
    <Route
      render={(props) =>
        localStorage.getItem("users") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/users/sign_in",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default Authenticate;
