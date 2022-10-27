const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const TodoSchema = mongoose.model("tasks", todoSchema);
module.exports = TodoSchema;
