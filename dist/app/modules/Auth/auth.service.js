"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../erros/AppError"));
const user_model_1 = require("../User/user.model");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
const signUpIntoDb = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    // check use already exist
    const isUserExist = yield user_model_1.User.findOne({ email: payLoad.email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_1.default.ALREADY_REPORTED, "User already Exist. Please login");
    }
    const newUser = yield user_model_1.User.create(payLoad);
    const tokenPayload = {
        name: newUser === null || newUser === void 0 ? void 0 : newUser.name,
        email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
        role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
        profileImage: newUser === null || newUser === void 0 ? void 0 : newUser.profileImage,
        address: newUser === null || newUser === void 0 ? void 0 : newUser.address,
        phone: newUser === null || newUser === void 0 ? void 0 : newUser.phone,
    };
    const token = (0, auth_utils_1.createToken)(tokenPayload, config_1.default.Access_Token_Secret, config_1.default.JWT_ACCESS_EXPIRE_IN);
    return { newUser, token };
});
const loginDb = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist
    const existingUser = yield user_model_1.User.findOne({ email: payLoad.email });
    if (!existingUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `User not found with this ${payLoad.email}`);
    }
    const matched = yield user_model_1.User.isPasswordMatched(payLoad.password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
    if (!matched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    }
    const tokenPayload = {
        name: existingUser === null || existingUser === void 0 ? void 0 : existingUser.name,
        email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
        role: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role,
        profileImage: existingUser === null || existingUser === void 0 ? void 0 : existingUser.profileImage,
        address: existingUser === null || existingUser === void 0 ? void 0 : existingUser.address,
        phone: existingUser === null || existingUser === void 0 ? void 0 : existingUser.phone,
    };
    const token = (0, auth_utils_1.createToken)(tokenPayload, config_1.default.Access_Token_Secret, config_1.default.JWT_ACCESS_EXPIRE_IN);
    const result = { existingUser, token };
    return result;
});
const getOneUserDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne(email);
});
const makeAdminDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findOne({ _id: id });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found or role not matched");
    }
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.role) === "user") {
        return yield user_model_1.User.findByIdAndUpdate(id, { role: "admin" }, { new: true, runValidators: true });
    }
    if ((userExist === null || userExist === void 0 ? void 0 : userExist.role) === "admin") {
        return yield user_model_1.User.findByIdAndUpdate(id, { role: "user" }, { new: true, runValidators: true });
    }
});
exports.authServices = {
    signUpIntoDb,
    loginDb,
    makeAdminDb,
    getOneUserDb,
};
