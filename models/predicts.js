// import mongoose from 'mongoose'
import Predict from '../schemas/predicts.js'
import populate from "../services/populate.js";

class predictsModel {

    async getAll(filter = {}) {
        return await Predict.find(filter)
        .select("-createdAt -updatedAt -__v")
    }

    // get con populate
    /*
    async getAll(filter = {}) {
        return await Predict.find(filter)
            .populate(populate.user)
            .populate(populate.predict)
    }
    */


    async getOne(id) {
        return await Predict.findById(id)
            .populate(populate.user)
            .populate(populate.predict)
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
            .populate(populate.user)
            .populate(populate.predict)
    }

    async delete(id) {
        return await Predict.findByIdAndDelete( id )
    }
}

export default new predictsModel