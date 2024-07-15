"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
// POST /auth/
router.post("/", [
    (0, express_validator_1.body)("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 4 })
        .withMessage("Please enter your valid name, minimum 4 characters required."),
    (0, express_validator_1.body)("email")
        .trim()
        .isEmail()
        .custom((emailId) => {
        return (0, auth_1.isUserExist)(emailId)
            .then((status) => {
            if (status) {
                return Promise.reject("User already exist.");
            }
        })
            .catch((error) => {
            return Promise.reject(error);
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 8 })
        .withMessage("Please enter at least 8 characters of password."),
    (0, express_validator_1.body)("confirm_password")
        .trim()
        .custom((value, { req }) => {
        if (value != req.body.password) {
            return Promise.reject("Password mismatch.");
        }
        return true;
    }),
], auth_1.registerUser);
// POST /auth/login
router.post("/login", auth_1.loginUser);
exports.default = router;
