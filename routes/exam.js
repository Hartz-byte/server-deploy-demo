"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const isAuth_1 = require("../middlewares/isAuth");
const exam_1 = require("../controllers/exam");
// GET /exam/quizid
router.get("/:quizid", isAuth_1.isAuthenticated, exam_1.startExam);
// POST /exam/quizid
router.post("/", isAuth_1.isAuthenticated, exam_1.startExam);
exports.default = router;
