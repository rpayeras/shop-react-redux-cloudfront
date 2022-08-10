import React from "react";
import "components/App/App.css";
import PageProducts from "components/pages/PageProducts/PageProducts";
import MainLayout from "components/MainLayout/MainLayout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageProductForm from "components/pages/PageProductForm/PageProductForm";
import PageCart from "components/pages/PageCart/PageCart";
import PageOrders from "components/pages/PageOrders/PageOrders";
import PageOrder from "components/pages/PageOrder/PageOrder";
import PageProductImport from "components/pages/admin/PageProductImport/PageProductImport";

import { PrivateRoute } from "../../routers";
import { useSelector } from "react-redux";
import { selectUser } from "store/userSlice";

function App() {
  const { logged } = useSelector(selectUser);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainLayout>
            <PrivateRoute path="/" isAuthenticated={logged}>
              <PageProducts />
            </PrivateRoute>

            <PrivateRoute
              path={["/admin/product-form/:id", "/admin/product-form"]}
              isAuthenticated={logged}
            >
              <PageProductForm />
            </PrivateRoute>
            <PrivateRoute path="/cart" isAuthenticated={logged}>
              <PageCart />
            </PrivateRoute>

            <PrivateRoute path="/admin/orders" isAuthenticated={logged}>
              <PageOrders />
            </PrivateRoute>

            <PrivateRoute path="/admin/order/:id" isAuthenticated={logged}>
              <PageOrder />
            </PrivateRoute>

            <PrivateRoute path="/admin/products" isAuthenticated={logged}>
              <PageProductImport />
            </PrivateRoute>
          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
