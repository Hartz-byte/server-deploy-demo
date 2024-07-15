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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const quiz_1 = __importDefault(require("./routes/quiz"));
const exam_1 = __importDefault(require("./routes/exam"));
const report_1 = __importDefault(require("./routes/report"));
const connectionString = process.env.CONNECTION_STRING || "";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Welcome!!");
});
// /user to userRoute
app.use("/user", user_1.default);
// /auth to authRoute
app.use("/auth", auth_1.default);
// /auth to quizRoute
app.use("/quiz", quiz_1.default);
// /exam to examRoute
app.use("/exam", exam_1.default);
// /report to reportRoute
app.use("/report", report_1.default);
app.use((err, req, res, next) => {
    let message;
    let statusCode;
    if (!!err.statusCode && err.statusCode < 500) {
        message = err.message;
        statusCode = err.statusCode;
    }
    else {
        message = "Something went wrong, please try again later.";
        statusCode = 500;
    }
    let resp = { status: "error", message, data: {} };
    if (!!err.data) {
        resp.data = err.data;
    }
    console.log(err.statusCode, err.message);
    res
        .status(statusCode)
        .send("Something went wrong, please try again later.");
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(connectionString);
        console.log("Connected to MongoDB!");
        app.listen(process.env.PORT, () => {
            console.log("Server connected!");
        });
    }
    catch (err) {
        console.error("Error connecting to MongoDB: ", err);
    }
});
startServer();
