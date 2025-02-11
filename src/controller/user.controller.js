import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    console.log('Request received at /register');
    res.status(200).json({
      message: "Backend learning"
    });
  });
  
export { registerUser };
