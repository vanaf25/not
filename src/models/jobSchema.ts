import mongoose from "mongoose";
const notificationSchema=new mongoose.Schema({
    ip:{type:String},
    extensionId:{type:String},
    parameter:{type:String}
});
export const NotificationModel=mongoose.model("notification",notificationSchema);
