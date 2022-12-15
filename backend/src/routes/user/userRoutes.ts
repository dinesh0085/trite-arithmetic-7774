import express, { Request, Response } from "express";
import LoginController from "../../controller/user/loginController";
const router = express.Router();
import UserController from "../../controller/user/signupController";
import checkUserAuth from "../../middlewares/user/userMiddleware";
import SignupController from "./../../controller/user/signupController";

// Middleware for protected routes
router.use("/changepassword", checkUserAuth);
router.use("/loggedUser", checkUserAuth);

// Public Routes
router.get("/", (req: Request, res: Response) => {
  res.send("User Routes Working");
});
router.post("/register", SignupController.userRegistration);
router.post("/login", LoginController.userLogin);

// Protected Routes
router.post("/changePassword", LoginController.changeUserPassword);
router.get("/loggedUser", LoginController.loggedUser);

export default router;
