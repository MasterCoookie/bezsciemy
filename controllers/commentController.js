const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
var ObjectId = require('mongodb').ObjectId; 

const comments_get = async (post_id, page_number)  => {
    let comments;
    const paginate = page_number * 10;
    try {
        comments = await Comment.find({ 
           fatherID: { $exists: false },
           postID: post_id
        }).skip(paginate).limit(10)//.sort({ accepted_at: 'desc' });
    } catch (err) {
        console.log(err);
    }
    return comments;
}

// page -1 is used to get the first reply
const replies_get = async (father_id, page_number) => {
    let replies;
    let limit_;
    let paginate;
    if (page_number == -1){
        limit_ = 1;
        paginate = 0;
    } else if (page_number == 0){
        paginate = 1;
        limit_ = 9
    } else {
        paginate = page_number * 10;
        limit_ = 10
    }
    try {
        replies = await Comment.find({ 
            fatherID: father_id
        }).skip(paginate).limit(limit_)//.sort({ accepted_at: 'desc' });
    } catch (err) {
        console.log(err);
    }
    return replies;
}

module.exports = {
    comments_get,
    replies_get
};
