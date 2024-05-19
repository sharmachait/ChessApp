"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryProvider = void 0;
const client_1 = require("@prisma/client");
const globalObj = global;
exports.repositoryProvider = globalObj.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalObj.prisma = exports.repositoryProvider;
exports.default = exports.repositoryProvider;
