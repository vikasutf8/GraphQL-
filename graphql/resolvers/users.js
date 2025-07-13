
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const createUser = async (args) => {
    try {

      const userExist =await User.findOne({ email: args.userInput.email });
      
      if (userExist) {
        throw new Error("User already exists");
      }
      const hashpass =await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        email: args.userInput.email,
        password: hashpass,
      });
      const res = await newUser.save();
      return {
        ...res._doc,
        password: null,
        _id: res._doc._id.toString(),
      };
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }


  const login = async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({ userId: user._id ,email:user.email }, process.env.JWT_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 7,
      });
      // const tokenExpiry = Date.now() + 1000 * 60 * 60 * 24 * 7;
      return {
        userId: user._id,
        token,
        tokenExpiry: 1,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  export default {
    createUser,
    login
  }
