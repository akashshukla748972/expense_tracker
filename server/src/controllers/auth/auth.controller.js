import { token } from "morgan";
import userModel from "../../models/user/user.model.js";
import { genHash } from "../../services/hash.js";
import CustomError from "../../utils/CustomError.js";
import { genToken } from "../../services/token.js";

export const handleRegisterUser = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "All fields are required.",
        isSucces: false,
      });
    }

    const { name, email, password } = req.body;

    const isExistEmail = await userModel.findOne({ email });
    if (isExistEmail) {
      return next(new CustomError("Email already exist. Plese login.", 409));
    }

    const { hashedPassword } = await genHash(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: newUser?._id,
      email: newUser?.email,
    };
    const { token } = await genToken(payload);

    return res.status(201).json({
      message: "User registered successfully. Now you can login.",
      token,
      isSucces: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
      isSucces: false,
    });
  }
};
