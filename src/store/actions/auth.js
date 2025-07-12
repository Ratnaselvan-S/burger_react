import * as actiontypes from "./actiontypes";
import axios from "axios";

const key = process.env.REACT_APP_KEY;
console.log(key); // https://api.example.com

export const authstart = () => {
  return {
    type: actiontypes.AUTH_START,
  };
};

export const authsuccess = (tokenid, userid) => {
  return {
    type: actiontypes.AUTH_SUCCESS,
    tokenid: tokenid,
    userid: userid,
  };
};

export const authfail = (error) => {
  return {
    type: actiontypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationdate");
  localStorage.removeItem("userid");
  return {
    type: actiontypes.AUTH_LOGOUT,
  };
};
export const authlogout = (logouttime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, logouttime * 1000);
  };
};

export const auth = (fromdata) => {
  return (dispatch) => {
    dispatch(authstart());
    const postdata = {
      email: fromdata.email,
      password: fromdata.password,
      returnSecureToken: true,
    };
    let url =
      " https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      key;

    if (fromdata.signup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + key;
    }
    axios
      .post(url, postdata)
      .then((response) => {
        const expiredate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        dispatch(authsuccess(response.data.idToken, response.data.localId));
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationdate", expiredate);
        localStorage.setItem("userid", response.data.localId);
        dispatch(authlogout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authfail(error.response.data.error.message));
      });
  };
};

export const set_auth_path = (path) => {
  return {
    type: actiontypes.SET_AUTH_REDIRECT,
    path: path,
  };
};

export const authchekout = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationdate = new Date(localStorage.getItem("expirationdate"));
      if (expirationdate <= new Date()) {
        dispatch(logout());
      } else {
        const userid = localStorage.getItem("userid");

        dispatch(authsuccess(token, userid));
        dispatch(
          authlogout((expirationdate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
