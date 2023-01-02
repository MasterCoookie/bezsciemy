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
    accepted_at: Date,
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
}, { strict: false });

postSchema.methods.acceptPostAndSave = async function(_user){
    this.accepted_by = _user;
    await this.save();
}

postSchema.methods.toggleUpVoteAndSave = async function (_userID){
    if (this.upVotes.includes(_userID)) { //remove upvote
        this.upVotes.splice(this.upVotes.indexOf(_userID), 1);
    } else if (this.downVotes.includes(_userID)) { // remove down, add up
        this.downVotes.splice(this.downVotes.indexOf(_userID), 1);
        this.upVotes.push(_userID)
    } else { // add upvote
        this.upVotes.push(_userID)
    }
    await this.save();
}

postSchema.methods.toggleDownVoteAndSave = async function (_userID){
    if (this.downVotes.includes(_userID)) { //remove downvote
        this.downVotes.splice(this.downVotes.indexOf(_userID), 1);
    } else if (this.upVotes.includes(_userID)) { // remove up, add down
        this.upVotes.splice(this.upVotes.indexOf(_userID), 1);
        this.downVotes.push(_userID)
    } else { // add downvote
        this.downVotes.push(_userID)
    }
    await this.save();
}

//up or down vote getter, returns: 1 if upvote, 0 if no vote, -1 if downvote
postSchema.methods.getVote = async function (_userID){
    if (this.downVotes.includes(_userID)){
        return -1;
    } else if (this.upVotes.includes(_userID)) {
        return 1;
    } else return 0;
}

postSchema.methods.getSumOfVotes = async function (){
    return (this.upVotes.length - this.downVotes.length)
}

postSchema.post('init', function (req, res, next) {
    this.score = this.upVotes.length -  this.downVotes.length;
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
