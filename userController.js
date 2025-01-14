import User from "../Model/userModel.js"
import bcrypt from 'bcryptjs'
import { responseMessages } from "../config/response.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 400,
                message: "All fields are required.",
            });
        }

        // Ensure passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 400,
                message: "Passwords do not match.",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json(responseMessages.EMAIL_EXIST || { message: "Email already exists." });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            return res
                .status(201)
                .json(responseMessages.ACCOUNT_CREATED || { message: "Account created successfully!" });
        }

        return res
            .status(500)
            .json(responseMessages.ACCOUNT_CREATION_FAILED || { message: "Failed to create account." });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: 500,
            message: "Server error: " + error.message,
        });
    }
};