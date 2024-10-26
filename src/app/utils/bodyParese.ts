import httpStatus from "http-status";
import AppError from "../erros/AppError";
import catchAsync from "./catchAsync";

const bodyParser = catchAsync(async (req, res, next) => {
  if (!req.body.data) {
    throw new AppError(httpStatus.NOT_FOUND, "User data not found");
  }
  req.body = JSON.parse(req.body.data);
});
export default bodyParser;
