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
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routers/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const jwtSecret = process.env.JwtSecret;
const bcryptsalt = bcryptjs_1.default.genSaltSync(10);
function startUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = (0, express_1.default)();
            app.use((0, cors_1.default)({
                credentials: true,
                origin: process.env.ClientUrl,
            }));
            app.use(body_parser_1.default.json());
            app.use((0, cookie_parser_1.default)());
            app.use('/auth', auth_1.default);
            const server = app.listen(process.env.PORT, () => {
                console.log(`listening on ${process.env.PORT}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
startUp();