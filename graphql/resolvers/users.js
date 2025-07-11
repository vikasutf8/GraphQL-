
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";



const createUser = async (args) => {
    try {
      const userExist = User.findOne({ email: args.userInput.email });
      if (userExist) {
        throw new Error("User already exists");
      }
      const hashpass = bcrypt.hash(args.userInput.password, 12);
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


  export default {
    createUser
  }
