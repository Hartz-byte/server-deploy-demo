"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitExam = exports.startExam = void 0;
const quiz_1 = __importDefault(require("../models/quiz"));
const report_1 = __importDefault(require("../models/report"));
const error_1 = __importDefault(require("../helper/error"));
const startExam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        const quiz = yield quiz_1.default.findById(quizId, {
            name: 1,
            questions_list: 1,
            is_published: 1,
        });
        if (!quiz) {
            const err = new error_1.default("No quiz found.");
            err.statusCode = 404;
            throw err;
        }
        if (!quiz.is_published) {
            const err = new error_1.default("Quiz is not published.");
            err.statusCode = 405;
            throw err;
        }
        const resp = {
            status: "success",
            message: "Quiz",
            data: quiz,
        };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.startExam = startExam;
const submitExam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizId = req.params.quizId;
        const attempted_question = req.body.attempted_question;
        const quiz = yield quiz_1.default.findById(quizId, { answers: 1 });
        const answers = quiz === null || quiz === void 0 ? void 0 : quiz.answers;
        const userId = req.userId;
        const allQuestions = Object.keys(answers);
        const total = allQuestions.length;
        let score = 0;
        for (let i = 0; i < total; i++) {
            let question_number = allQuestions[i];
            if (!!attempted_question[question_number] &&
                answers[question_number] == attempted_question[question_number]) {
                score = score + 1;
            }
        }
        const report = new report_1.default({ userId, quizId, score, total });
        const data = yield report.save();
        const resp = {
            status: "success",
            message: "Quiz submitted",
            data: { total, score, ReportId: data._id },
        };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
});
exports.submitExam = submitExam;
