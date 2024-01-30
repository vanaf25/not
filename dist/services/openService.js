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
const path_1 = __importDefault(require("path"));
const fd = fs.promises;
class OpenService {
    static async getNotification(date, ip, id) {
        console.log('date:', date);
        const notification = await jobSchema_1.NotificationModel.findOne({ ip });
        if (notification)
            throw api_error_middleware_1.default.NotFound("You can't get a notifications");
        const filePath = path_1.default.join(__dirname, '..', 'services', 'url.txt');
        const data = await fd.readFile(filePath, "utf8");
        const [link, date2] = data.split(";");
        console.log(link, date2);
        if (date2 === date) {
            await jobSchema_1.NotificationModel.create({ ip, id });
            return { url: link };
        }
        else
            throw api_error_middleware_1.default.NotFound("No pages for today");
    }
}
exports.OpenService = OpenService;
