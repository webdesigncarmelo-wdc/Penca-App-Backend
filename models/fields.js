import mongoose from 'mongoose'
import Field from '../schemas/fields.js'

class fieldsModel {

    async getAll() {
        return await Field.find({ status : req.query.status })
    }

    async getOne(id) {
                return await Field.findOne({ _id: new mongoose.Types.ObjectId(id) })
    }

    async create(field) {
        return await Field.create(field)
    }

    async update(id, field) {
        // {new:true} retorna objeto actualizado
        return await Field.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, field, {new:true})
    }

    async delete(id) {
        return await Field.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    }
}

export default new fieldsModel