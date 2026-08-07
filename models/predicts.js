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

    async getByUserAndMatch(user, match) {
        return await Predict.findOne({ user, match })
            .populate(userPopulate)
            .populate(matchPopulate)
    }

    async getByMatch(id) {
        return await Predict.find({ match : id })
            .populate(userPopulate)
    }

    async getByUser(id) {
        return await Predict.find({ user : id })
            .populate(matchPopulate)
    }

    async save(predict) {
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

        return await savedPredict
            .populate(userPopulate)
            .populate(matchPopulate);
    }

    

    async delete(id) {
        return await Predict.findByIdAndDelete( id )
    }
}

export default new predictsModel