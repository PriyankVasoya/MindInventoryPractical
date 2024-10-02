const mongoose = require('../../config/database')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    is_complete: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('task',taskSchema)

