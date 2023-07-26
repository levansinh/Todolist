import {
  verifyTokenWithAdmin,
  verifyToken,
  checkToken
} from "../middlewares/verifyToken.js";
import user from "./user.js";
import auth from "./auth.js";
import todo from "./todo.js";

function router(app) {
  app.use("/v1/api/user", user); // note check login Admin
  app.use("/v1/api/auth", auth);
  app.use("/v1/api/todo", todo);
}

export default router;
 