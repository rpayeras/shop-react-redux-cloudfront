import React, { FC } from "react";
import { Route } from "react-router-dom";

type Props = {
  children: any;
  isAuthenticated: boolean;
  [key: string]: any;
};

export const PrivateRoute: FC<Props> = ({
  children,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      exact
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <h1>Please login with any email and password first</h1>
        )
      }
    />
  );
};
