"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenController = void 0;
const api_error_middleware_1 = __importDefault(require("../middlewares/api-error.middleware"));
const openService_1 = require("../services/openService");
class OpenController {
    /*static async create(req,res,next){
        try {
            const body=req.body;
            const result= await OpenService.createNotification(body.date,body.link);
            return   res.json({result});
        }
        catch (error) {
            // Перевірка, чи об'єкт помилки є екземпляром ApiError
            if (error instanceof ApiError) {
                // Повертаємо відповідь клієнту з використанням властивостей з вашого класу ApiError
                console.log('err:',error.statusCode);
                res.status(error.statusCode).json({ error: { message: error.message } });
            } else {
                // Інші неочікувані помилки обробляються власним способом
                next(error);
            }
        }
    }*/
    static async getNotification(req, res, next) {
        try {
            const date = req?.params?.date;
            console.log('ip:', req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                null);
            const ip = req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                null;
            console.log('ip2:', req.ip);
            const id = req.query.id;
            const result = await openService_1.OpenService.getNotification(date, ip, id);
            return res.json(result);
        }
        catch (error) {
            if (error instanceof api_error_middleware_1.default) {
                console.log('err:', error.statusCode);
                console.log('error:', error);
                res.status(error.statusCode).json({ error: { message: error.message } });
            }
            else {
                next(error);
            }
        }
    }
}
exports.OpenController = OpenController;
