const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Notes', NoteSchema)