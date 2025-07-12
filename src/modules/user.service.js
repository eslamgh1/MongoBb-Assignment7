import userModel from "../DB/models/user.model.js";

export const createUser = async (req, res, next) => {
  try {
    const user = await userModel.insertOne(req.body);
    console.log("createUser as test");
    return res.status(201).json({ message: "user added", user });
  } catch (error) {
    return res.status(500).json({ Mymessage: "My-Error:", error });
  }
};
