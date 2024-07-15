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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../helper/error"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            const err = new error_1.default("Not authenticated");
            err.statusCode = 401;
            throw err;
        }
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        // console.log(token);
        let decodedToken;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, "secretkey");
        }
        catch (error) {
            const err = new error_1.default("Not authenticated");
            err.statusCode = 401;
            throw err;
        }
        if (!decodedToken) {
            const err = new error_1.default("Not authenticated");
            err.statusCode = 401;
            throw err;
        }
        req.userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.userId;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.isAuthenticated = isAuthenticated;
