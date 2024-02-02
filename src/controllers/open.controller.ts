import ApiError from "../middlewares/api-error.middleware";
import {OpenService} from "../services/openService";
import path from "path";
export class OpenController{
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
static async getNotification(req,res,next){
    try {
        const ip=req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress ||
            null
        console.log('url:',path.join(__dirname, '..', 'services', 'url.txt'))
        const id=req.query.id
        const result= await OpenService.getNotification(ip,id,req.query.p);
        return   res.json(result);
    }
    catch (error) {
        if (error instanceof ApiError) {
            console.log('err:',error.statusCode);
            console.log('error:',error);
            res.status(error.statusCode).json({ error: { message: error.message } });
        } else {
            next(error);
        }
    }
}
}
