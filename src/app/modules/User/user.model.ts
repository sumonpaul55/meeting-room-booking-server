import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import config from "../../config";

const UserModelSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: 0 },
  phone: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  address: { type: String, required: true },
  isDeleted: { type: Boolean, default: false, select: 0 },
});
// password becrypt before save
UserModelSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.BCRYPT_SALTROUND));
  next();
});

// doc for post middle ware hide the password
UserModelSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// check password is matched using static method
UserModelSchema.static.isPasswordMatched = async function (plainTextPass: string, hashPassword: string) {
  return await bcrypt.compare(plainTextPass, hashPassword);
};

export const User = model<TUser>("User", UserModelSchema);
