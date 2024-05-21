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
exports.auth = exports.validateToken = exports.accessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function accessToken(req, res, next) {
    const cookies = req.signedCookies;
    const at = cookies.at;
    if (!at) {
        const hat = (req.header('Authorization') || '').split('').pop();
        if (!!hat) {
            req.aToken = hat;
        }
    }
    else {
        req.aToken = at;
    }
    next();
}
exports.accessToken = accessToken;
function validateToken(token, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwtSecret = process.env.JwtSecret;
        try {
            let decodedJson = (yield jsonwebtoken_1.default.verify(token, jwtSecret));
            req.username = decodedJson.username;
            req.id = decodedJson.id;
            return true;
        }
        catch (e) {
            return false;
        }
    });
}
exports.validateToken = validateToken;
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const at = req.aToken;
        const valid = yield validateToken(at, req);
        if (!valid) {
            res.status(401).send('Unauthorized.');
            next(new Error('Unauthorized.'));
            return;
        }
        next();
    });
}
exports.auth = auth;
