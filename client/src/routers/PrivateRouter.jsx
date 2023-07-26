import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import PropTypes from "prop-types";

const PrivateRoute = ({ route, children }) => {
  const location = useLocation();
  const userId = localStorage.getItem("idUser");

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const id = currentUser?.account._id;

  let Layout = DefaultLayout;

  if (route.layout) {
    Layout = route.layout;
  } else if (route.layout === null) {
    Layout = Fragment;
  }

  return id || userId ? (
    <Layout>{children}</Layout>
  ) : (
    <Navigate to={"/auth"} state={{ from: location }} />
  );
};
PrivateRoute.propTypes = {
  route: PropTypes.any,
  children: PropTypes.any,
};
export default PrivateRoute;
