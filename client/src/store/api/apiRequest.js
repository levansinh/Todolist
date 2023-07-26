import { loginFailed, loginStart, loginSuccess ,logOutFailed,logOutStart,logOutSuccess} from "../auth/authSlice";

import instance from "../../configs/config";

export const loginUser = async (user, dispatch, navigate) => {
  console.log(user);
  try {
    dispatch(loginStart());
    const res = await instance.post("/auth/login", user,{ withCredentials: true });
    dispatch(loginSuccess(res.data));
    if (res) {
      navigate("/");
    }
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  } catch (err) {
    dispatch(loginFailed(err));
  }
};
export const registerUser = (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = instance.post("/auth/register", user,{ withCredentials: true });
    // console.log(res.data);
    dispatch(loginSuccess(res.data));
    navigate("/auth");
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const logOut = async (dispatch, id, navigate) => {
  dispatch(logOutStart());
  try {
      const data = await instance.post('/auth/logout', id,{ withCredentials: true });
      dispatch(logOutSuccess());
      navigate('/auth');

      return data;
  } catch (err) {
      dispatch(logOutFailed());
  }
};