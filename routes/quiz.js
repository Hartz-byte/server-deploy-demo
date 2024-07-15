"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const isAuth_1 = require("../middlewares/isAuth");
const quiz_1 = require("../controllers/quiz");
const router = express_1.default.Router();
// created PUT
router.post("/", isAuth_1.isAuthenticated, [
    (0, express_validator_1.body)("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("Please enter your valid name, minimum 10 characters required."),
    (0, express_validator_1.body)("questions_list").custom((questions_list) => {
        if (questions_list.length == 0) {
            return Promise.reject("Enter at least one question.");
        }
        return true;
    }),
    (0, express_validator_1.body)("answers").custom((answers) => {
        if (Object.keys(answers).length == 0) {
            return Promise.reject("Answers should not be empty.");
        }
        return true;
    }),
], quiz_1.createQuiz);
// GET
router.get("/:quizId", isAuth_1.isAuthenticated, quiz_1.getQuiz);
// updated PUT
router.put("/", isAuth_1.isAuthenticated, [
    (0, express_validator_1.body)("name")
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 10 })
        .withMessage("Please enter your valid name, minimum 10 characters required."),
    (0, express_validator_1.body)("questions_list").custom((questions_list) => {
        if (questions_list.length == 0) {
            return Promise.reject("Enter at least one question.");
        }
        return true;
    }),
    (0, express_validator_1.body)("answers").custom((answers) => {
        if (Object.keys(answers).length == 0) {
            return Promise.reject("Answers should not be empty.");
        }
        return true;
    }),
], quiz_1.updateQuiz);
// deleted DELETE
router.delete("/:quizId", isAuth_1.isAuthenticated, quiz_1.deleteQuiz);
// publish PATCH
router.patch("/publish", isAuth_1.isAuthenticated, quiz_1.publishQuiz);
exports.default = router;
