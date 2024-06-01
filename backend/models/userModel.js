const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: [true, "User name is must!"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is must!"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    password: {
        type: String,
        required: [true, "Password is must!"],
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!",
        },
    },
    userTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo",
        },
    ],
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
