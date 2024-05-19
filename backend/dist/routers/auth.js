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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const repositoryProvider_1 = __importDefault(require("../Infra/repositoryProvider"));
require('dotenv').config();
const authRouter = express_1.default.Router();
authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield repositoryProvider_1.default.user.findFirst({
            where: {
                username: username,
            },
        });
        if (user != null) {
            res.status(409).json({ error: 'User with this email already exists.' });
            return;
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        const emailConfirmationToken = bcryptjs_1.default.hashSync(username, salt);
        const newUser = yield repositoryProvider_1.default.user.create({
            data: {
                username: username,
                passwordHash: hashedPassword,
                passwordSalt: salt,
                emailConfirmationToken: emailConfirmationToken,
                role: 'PLAYER',
            },
            select: {
                id: true,
            },
        });
        return res.status(201).json({ response: newUser });
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}));
exports.default = authRouter;
