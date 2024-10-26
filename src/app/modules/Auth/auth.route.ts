import express from "express";
import validateRequest from "../../middileWare/validateRequest";
import { userValidations } from "../User/user.validation";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import authGuared from "../../middileWare/authGuared";
import { USER_ROLE } from "../User/user.constant";
import bodyParser from "../../middileWare/bodyParese";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post("/signup", multerUpload.single("image"), bodyParser, validateRequest(userValidations.createUserValidationSchma), authController.signUp);

router.get("/users", authController.getOneUser);

router.post("/login", validateRequest(authValidation.loginValidationSchema), authController.login);

router.put("/status/:id", authGuared(USER_ROLE.admin), authController.makeAdmin);

export const authRoutes = router;
