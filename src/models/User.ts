import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Extend Document and add methods
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string; // hashed password
  age?: number;

  generateJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    age: { type: Number },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  try {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Compare password with hash
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Generate JWT
UserSchema.methods.generateJWT = function (): string {
  const payload = { sub: this._id.toString(), email: this.email };
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");

  const expiresIn = (process.env.JWT_EXPIRES_IN ??
    "1h") as import("jsonwebtoken").SignOptions["expiresIn"];

  return jwt.sign(payload, secret, { expiresIn });
};

// Prevent recompilation in dev
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
