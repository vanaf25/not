"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenService = void 0;
const jobSchema_1 = require("../models/jobSchema");
const api_error_middleware_1 = __importDefault(require("../middlewares/api-error.middleware"));
const fs = __importStar(require("fs"));
const fd = fs.promises;
class OpenService {
    static async getNotification(date, ip, id, param) {
        console.log('date from request:', date);
        console.log('typeof 1:', typeof date);
        console.log('length 1:', date.trim().length);
        const notification = await jobSchema_1.NotificationModel.findOne({ ip });
        if (notification)
            throw api_error_middleware_1.default.NotFound("You can't get a notifications");
        const data = await fd.readFile('dist/services/url.txt', "utf8");
        const [link, date2] = data.split(";");
        console.log('date from file:', date2);
        console.log('typeof 1:', typeof date2);
        console.log('length 1:', date2.trim().length);
        console.log(`${date2.trim()}===${date.trim()}: `, date2 === date);
        if (date2.trim() === date.trim()) {
            console.log('id:', id);
            await jobSchema_1.NotificationModel.create({ ip, extensionId: id, parameter: param });
            return { url: link };
        }
        else
            throw api_error_middleware_1.default.NotFound("No pages for today");
    }
}
exports.OpenService = OpenService;
