import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";

type Props = {
  children: any;
  isAuthenticated: boolean;
  [key: string]: any;
};

export const PublicRoute: FC<Props> = ({
  children,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      exact
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
