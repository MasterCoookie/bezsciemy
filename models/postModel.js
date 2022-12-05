const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
		required: [true, 'Please enter a title for fakenews'],
        minlength: [4, 'A title must be at least 4 characters long'],
		maxlength: [36, 'A title must not be longer than 36 characters'],
    },
    author_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Each post must have an author"]
    },
    accepted_by: {
        type: Schema.Types.ObjectId
    },
    fake_desc:      String,
    fake_links:    [String],
    fake_images:   [String],
    fake_iframes:  [String],
    debunk_desc:    String,
    debunk_links:  [String],
    debunk_images: [String],
    debunk_iframes:[String],
    upVotes: [Schema.Types.ObjectId],
    downVotes: [Schema.Types.ObjectId]
});

postSchema.methods.acceptPostAndSave = async function(_user){
    this.accepted_by = _user;
    await this.save();
}

postSchema.methods.toggleUpVoteAndSave = async function (_user){
    if (this.upVotes.includes(_user)) { //remove upvote
        this.upVotes.splice(this.upVotes.indexOf(_user), 1);
    } else if (this.downVotes.includes(_user)) { // remove down, add up
        this.downVotes.splice(this.downVotes.indexOf(_user), 1);
        this.upVotes.push(_user)
    } else { // add upvote
        this.upVotes.push(_user)
    }
    await this.save();
}

//add toggle down vote

const Post = mongoose.model('Post', postSchema);

module.exports = Post;