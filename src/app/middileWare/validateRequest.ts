import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (zodSchema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    // zod validation
    await zodSchema.parseAsync({
      body: req.body,
    });
    next();
  });
};
export default validateRequest;
