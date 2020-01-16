const {Schema, model, Types} = require('mongoose')

const Note = new Schema({
    title: {
        type: String,
        required: true
    },
    view: {
        type: Boolean,
        required: true
    },
    owner: {type: Types.ObjectId, ref: 'User'}
},{
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = model("Note", Note)