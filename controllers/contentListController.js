const User = require('../models/userModel');
const Post = require('../models/postModel');

const modify_users = async (post_no_users, is_accepted) => {
    return await Promise.all(
        post_no_users.map(async (post) => {
            const new_post = post.toObject();

            let author = await User.findById(post.author_id);
            new_post.author_obj = author;
            
            if(is_accepted) {
                let accepted_by = await User.findById(post.accepted_by)
                new_post.accepted_by = accepted_by;
            }
            
            return new_post;
    }));
}

const acquire_posts = async (query_type, page_number)  => {
    let posts;
    const paginate = page_number * 10;
    try {
        if(query_type === 'main') {
            posts = await Post.find({ accepted_by: { $exists: true } }).skip(paginate).limit(10).sort({ accepted_at: 'desc' });
        } else if(query_type === 'waiting_room')  {
            posts = await Post.find({ accepted_by: { $exists: false } }).skip(paginate).limit(10);//TODO, order
        } else if(query_type === 'hall_of_fame') {
            posts = await Post.find({ accepted_by: { $exists: true } }).skip(paginate).limit(10).sort({ accepted_at: 'desc' });
            // posts = posts.filter(post => post.)
        }
    } catch (err) {
        console.log(err);
    }

    posts = await modify_users(posts, query_type !== 'waiting_room');
    
    return posts;
}

const calculate_page_number = page_number => {
    if(page_number > 0) {
        --page_number;
    } else {
        page_number = 0;
    }
    return page_number;
}

const main_get = async (req, res) => {
    let page_number = calculate_page_number(req.params.page_number);
    const posts = await acquire_posts("main", page_number);
    
    console.log(posts);
    res.render('contentList/page', { posts });
}

const waiting_room_get = async (req, res) => {
    let page_number = calculate_page_number(req.params.page_number);
    const posts = await acquire_posts("waiting_room", page_number);
    
    console.log(posts);
    res.render('contentList/page', { posts });
}

const hall_of_fame_get = async (req, res) => {
    let page_number = calculate_page_number(req.params.page_number);
    const posts = await acquire_posts("hall_of_fame", page_number);
    
    // console.log(posts);
    res.render('contentList/page', { posts });
}

module.exports = {
    main_get,
    waiting_room_get,
    hall_of_fame_get
};
