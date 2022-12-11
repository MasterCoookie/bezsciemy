const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    authorID: {
        type: Schema.Types.ObjectId,
		required: true
    },
    postID: {
        type: Schema.Types.ObjectId,
		required: true
    },
    father: Schema.Types.ObjectId,
    content: {
        type: String,
		required: true
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;