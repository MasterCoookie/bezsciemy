const User = require('../models/userModel');
const Post = require('../models/postModel');

const acquire_posts = async (query_type, page_number)  => {
    let posts;
    const paginate = page_number * 10;
    try {
        if(query_type === "main") {
            posts = await Post.find({ accepted_by: { $exists: true } }).skip(paginate).limit(10).sort({ accepted_at: 'desc' });
        }
    } catch (err) {
        console.log(err);
    }
    

    return posts;
}

const main_get = async (req, res) => {
    let page_number = req.params.page_number;
    if(page_number > 0) {
        --page_number;
    } else {
        page_number = 0;
    }
    // console.log(page_number);
    const posts = await acquire_posts("main", page_number);
    // console.log(posts);
    res.send("not implemented");
}

module.exports = {
    main_get
};
