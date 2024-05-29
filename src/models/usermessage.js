const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Id");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        validate(value) {
            if (value.toString().length < 10) {
                throw new Error("Phone number must be at least 10 digits");
            }
        }
    },
    message: {
        type: String,
        required: true,
        minLength: 3
    }
});

const UserMessage = mongoose.model("UserMessage", userSchema);

module.exports = UserMessage;
