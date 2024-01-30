import {NotificationModel} from "../models/jobSchema";
import ApiError from "../middlewares/api-error.middleware";
import * as fs from "fs";
import path from "path";
const fd=fs.promises
export class OpenService {
   static async getNotification(date,ip,id,param){
       console.log('date2:',date);
       const notification= await NotificationModel.findOne({ip});
       if (notification)    throw ApiError.NotFound("You can't get a notifications");
       const data = await fd.readFile('dist/services/url.txt', "utf8");
       const [link,date2]=data.split(";")
       console.log(link,date2)
       if (date2===date){
           await NotificationModel.create({ip,id,parameter:param})
           return {url:link};
       }
       else throw ApiError.NotFound("No pages for today")
   }
}
