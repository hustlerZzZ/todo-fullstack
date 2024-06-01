const User = require("../models/userModel");
const jsonWebToken = require("jsonwebtoken");
const zod = require("zod");
const { promisify } = require("util");

// Zod Schema's
const signUpSchema = zod.object({
    userName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
    passwordConfirm: zod.string().min(6),
});

// Helper Functions
const signToken = function (id) {
    return jsonWebToken.sign({ id }, process.env.JWT_SECRET);
};

const createToken = function (user, statusCode, res) {
    const token = signToken(user._id);
    const cookieOptions = {
        httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

exports.signUp = async function (req, res) {
    const dataValidation = signUpSchema.safeParse(req.body);

    if (!dataValidation.success) {
        res.status(403).json({
            status: "fail",
            msg: "Validation Error!",
        });
    } else {
        const newUser = await User.create(req.body);
        createToken(newUser, 201, res);
    }
};

exports.signIn = async function (req, res) {
    const optionalEmail = signUpSchema.partial({
        userName: true,
        passwordConfirm: zod.string().min(6),
    });

    const dataValidation = optionalEmail.safeParse(req.body);
    if (!dataValidation.success) {
        res.status(403).json({
            status: "fail",
            msg: "Validation Error!",
        });
    } else {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(401).json({
                status: "fail",
                msg: "Incorrect email or password",
            });
        } else {
            createToken(user, 200, res);
        }
    }
};

exports.protect = async function (req, res, next) {
    // 1. Getting token and check if it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({
            status: "failed",
            msg: "You are not logged in! Please log in to get access.",
        });
    }

    // 2. Token Verification
    const decoded = await promisify(jsonWebToken.verify)(
        token,
        process.env.JWT_SECRET
    );

    // 3. Check if the user exists
    const currentUser = await User.findById(decoded.id)
        .select("-password")
        .select("-createdAt")
        .select("-__v");

    if (!currentUser) {
        res.status(401).json({
            status: "failed",
            msg: "The user belonging to this token does not exist!",
        });
    }

    req.user = currentUser;
    next();
};

exports.verify = async function (req, res) {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({
            status: "failed",
            msg: "You are not logged in! Please log in to get access.",
        });
    }

    const decoded = await promisify(jsonWebToken.verify)(
        token,
        process.env.JWT_SECRET
    );

    // 3. Check if the user exists
    const currentUser = await User.findById(decoded.id)
        .select("-password")
        .select("-createdAt")
        .select("-__v");

    if (!currentUser) {
        res.status(401).json({
            status: "failed",
            msg: "The user belonging to this token does not exist!",
        });
    }

    req.user = currentUser;

    res.status(200).json({
        status: "success",
        data: { currentUser },
    });
};
