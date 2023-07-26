import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import PropTypes from "prop-types";

const UnauthorizeRoute = ({ route, children }) => {
  const userId = localStorage.getItem("idUser");

  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const id = currentUser?.account._id;
  let Layout = DefaultLayout;

  if (route.layout) {
    Layout = route.layout;
  } else if (route.layout === null) {
    Layout = Fragment;
  }

  return id || userId ? <Navigate to={"/"} /> : <Layout>{children}</Layout>;
};
UnauthorizeRoute.propTypes = {
  route: PropTypes.any,
  children: PropTypes.any,
};

export default UnauthorizeRoute;
