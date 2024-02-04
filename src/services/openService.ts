import {NotificationModel} from "../models/jobSchema";
import ApiError from "../middlewares/api-error.middleware";
import * as fs from "fs";
const fd=fs.promises
export class OpenService {
   static async getNotification(ip,id,param){
     /*  console.log('date from request:',date);
       console.log('typeof 1:', typeof date)
       console.log('length 1:',date.trim().length)*/
       const notification= await NotificationModel.findOne({_id: id});
       if (notification)    throw ApiError.NotFound("You can't get a notifications");
       const data = await fd.readFile('dist/services/url.txt', "utf8");
/*
       const [link,date2]=data.split(";")
*/
      /* console.log('date from file:',date2);
       console.log('typeof 1:', typeof date2);
       console.log('length 1:',date2.trim().length);
       console.log(`${date2.trim()}===${date.trim()}: `,date2===date);
           console.log('id:',id);*/
          const not= await NotificationModel.create({ip,parameter:param})
           return {url:data,id:not._id}
   }
}
