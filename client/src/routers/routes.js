import Action from "../pages/Action";
import Important from "../pages/Important";
import Today from "../pages/Today";
import Completed from "../pages/Completed";

import Login from "../pages/Login";
import Register from "../pages/Register"
// const publicRouters = [
//   { path: "/", component: Today },
//   { path: "/important", component: Important },
//   { path: "/action", component: Action },
//   { path: "/completed", component: Completed },
//   { path: "/auth", component: Login,layout:null },
//   { path: "/auth/register", component: Register,layout:null },
// ];
// const privateRouters = [];

// export { publicRouters, privateRouters };


const publicRouters = [
  { path: "/auth", component: Login,layout:null },
  { path: "/auth/register", component: Register,layout:null },
];
const privateRouters = [  { path: "/", component: Today },
{ path: "/important", component: Important },
{ path: "/action", component: Action },
{ path: "/completed", component: Completed },];

export { publicRouters, privateRouters };
