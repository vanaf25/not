"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jobSchema_1 = require("../models/jobSchema");
const api_error_middleware_1 = __importDefault(require("../middlewares/api-error.middleware"));
const jobsService_1 = require("./jobsService");
class UserService {
    static async getProfileData(userId) {
        const user = await jobSchema_1.UserModel.findOne({ _id: userId });
        if (!user)
            throw api_error_middleware_1.default.NotFound("The user was not founded");
        const { creditSpentCount, data } = await this.getMyHistory(userId, 1, 10, true);
        const { availableJobs: availableExchanges } = await jobsService_1.JobsService.getJobs(1, userId);
        const returnedUser = JSON.parse(JSON.stringify(user));
        console.log('1');
        return { ...returnedUser, exchangesMade: creditSpentCount, availableExchanges };
    }
    static async getUserHistory(userId, currentPage, pageSize = 10) {
        if (currentPage < 1)
            currentPage = 1;
        const PAGE_SIZE = pageSize;
        const skip = (currentPage - 1) * PAGE_SIZE;
        const [histories, historyCount] = await Promise.all([
            jobSchema_1.HistoryModel.find({ user: userId }).skip(skip).limit(PAGE_SIZE)
                .populate({ path: "job", populate: {
                    path: 'author',
                    model: "User",
                } }).exec(),
            jobSchema_1.HistoryModel.countDocuments({ user: userId }),
        ]);
        return { data: histories, count: historyCount };
    }
    static async getMyHistory(userId, currentPage, pageSize = 10, creditSpent) {
        if (currentPage < 1)
            currentPage = 1;
        const PAGE_SIZE = pageSize;
        const skip = (currentPage - 1) * PAGE_SIZE;
        console.log('u:', userId);
        let [histories, historyCount] = await Promise.all([
            jobSchema_1.HistoryModel.
                find({})
                .populate({
                path: "job",
                match: { author: userId },
                options: { limit: 1 },
                populate: {
                    path: 'author',
                    model: "User",
                }
            }).populate("user").exec(),
            jobSchema_1.HistoryModel.countDocuments({
                'job': { $exists: true, $ne: null },
            })
        ]);
        //comment
        console.log('id:', userId);
        //@ts-ignore
        histories = [...histories].filter((history, index) => {
            // Slice the array to get the elements for the current page
            return history.job && history.user.id != userId;
        });
        const creditSpentCount = [...histories].filter(h => h.price !== 0).length;
        const historiesLength = histories.length;
        //@ts-ignore
        histories = [...histories].slice(skip, skip + pageSize);
        return { data: histories, count: historiesLength, creditSpentCount };
    }
    static async getMyJobs(userId, page) {
        const PAGE_SIZE = 5;
        const skip = (page - 1) * PAGE_SIZE;
        const user = await jobSchema_1.UserModel.findOne({ _id: userId }).populate("histories").exec();
        const [data, count] = await Promise.all([
            jobSchema_1.JobModel.find({
                $and: [{ author: userId }, { isDeleted: false }]
            })
                .skip(skip).limit(PAGE_SIZE),
            jobSchema_1.JobModel.countDocuments({
                $and: [{ author: userId }, { isDeleted: false }]
            }),
        ]);
        return { data, count };
    }
}
exports.UserService = UserService;
