const User = require('../models/userModel');
const Post = require('../models/postModel');

const acquire_posts = async (query_type, page_number)  => {
    let posts;
    const paginate = page_number * 10;

    if(query_type === "main") {
        posts = await Post.find({ accepted_by: true }, { skip: paginate, limit: 10, sort: { accepted_at: 'desc' } });
    }

    return posts;
}

const main_get = async (req, res) => {
    //TODO page number
    const posts = await acquire_posts("main", 1);
    console.log(posts);
}

module.exports = {
    main_get
};
