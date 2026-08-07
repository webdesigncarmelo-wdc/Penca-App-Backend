// import mongoose from 'mongoose'
import Predict from '../schemas/predicts.js'

const userPopulate = {
    path: "user",
    select: "username image"
};

const matchPopulate = {
    path: "match",
    populate: [
        {
            path: "homeTeam",
            select: "name shortName image"
        },
        {
            path: "awayTeam",
            select: "name shortName image"
        }
    ]
};

class predictsModel {

    async getAll(filter = {}) {
        return await Predict.find(filter)
            .populate(userPopulate)
            .populate(matchPopulate)
    }

    async getOne(id) {
        return await Predict.findById(id)
            .populate(userPopulate)
            .populate(matchPopulate)
    }

    async upsert(predict) {
        const savedPredict = await Predict.findOneAndUpdate(
            {
                user: predict.user,
                match: predict.match
            },
            predict,
            {
                new: true,
                upsert: true
            }
        );

        return await Predict.findById(savedPredict._id)
            .populate(userPopulate)
            .populate(matchPopulate);
    }

    async delete(id) {
        return await Predict.findByIdAndDelete( id )
    }
}

export default new predictsModel