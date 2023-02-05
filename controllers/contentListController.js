const User = require('../models/userModel');
const Post = require('../models/postModel');

const page_size = 2;

const modify_users = async (post_no_users, is_accepted) => {
    return await Promise.all(
        post_no_users.map(async (post) => {
            // const new_post = post.toObject();

            let author = await User.findById(post.author_id);
            post.author_obj = author;
            
            if(is_accepted) {
                let accepted_by = await User.findById(post.accepted_by)
                post.accepted_by = accepted_by;
            }
            
            return post;
    }));
}

const acquire_posts = async (query_type, page_number)  => {
    let posts;
    let posts_query;
    let total_posts_count = 0;
    const paginate = page_number * page_size;
    try {
        if(query_type === 'main') {
            posts_query = Post.find({ accepted_by: { $exists: true } }).sort({ accepted_at: 'desc' });
            total_posts_count = (await posts_query.clone()).length;
            posts = (await posts_query.skip(paginate).limit(page_size)).map(post => post.toObject());
        } else if(query_type === 'waiting_room')  {
            posts_query = Post.find({ accepted_by: { $exists: false } })//TODO, order
            total_posts_count = (await posts_query.clone()).length;
            posts = (await posts_query.skip(paginate).limit(page_size)).map(post => post.toObject());
        } else if(query_type === 'hall_of_fame') {
            posts = await Post.aggregate([
              {
                $match: {
                  accepted_by: { $exists: true }
              }
              }, {
                $addFields: {
                  "upVotesCount": {
                    $size: "$upVotes"
                  },
                  "downVotesCount": {
                    $size: "$downVotes"
                  },
                  "grade": {
                    $subtract: [{
                      $size: "$upVotes"
                    }, {
                      $size: "$downVotes"
                    }]
                  }
                }
              }]).sort({"grade": 'desc'})
              total_posts_count = posts.length;
              posts = posts.slice(page_number * page_size, (page_number + 1) * page_size);
        }
    } catch (err) {
        console.log(err);
    }
    // console.log(posts);
    
    console.log(total_posts_count);
    posts = await modify_users(posts, query_type !== 'waiting_room');
    
    return [posts, total_posts_count];
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
    const posts_count_pair = await acquire_posts("main", page_number);
    const posts = posts_count_pair[0];
    const posts_count = posts_count_pair[1]; 

    const is_right = (posts_count - page_size * (page_number + 1)) < 0
    const is_left = page_number === 0;
    
    // console.log(is_left);
    // console.log(is_right);
    res.render('contentList/page', {
      posts,
      user: req.session.user,
      title: "",
      pagination: {
        is_left,
        is_right,
        page_number: page_number + 1,
      }
    });
}

const waiting_room_get = async (req, res) => {
    let page_number = calculate_page_number(req.params.page_number);
    const posts_count_pair = await acquire_posts("waiting_room", page_number);
    const posts = posts_count_pair[0];
    const posts_count = posts_count_pair[1]; 

    const is_right = (posts_count - page_size * (page_number + 1)) < 0
    const is_left = page_number === 0;
    
    // console.log(is_left);
    // console.log(is_right);
    res.render('contentList/page', {
      posts,
      user: req.session.user,
      title: "Waiting Room",
      pagination: {
        is_left,
        is_right,
        page_number: page_number + 1,
      }
    });
}

const hall_of_fame_get = async (req, res) => {
    let page_number = calculate_page_number(req.params.page_number);
    const posts_count_pair = await acquire_posts("hall_of_fame", page_number);
    const posts = posts_count_pair[0];
    const posts_count = posts_count_pair[1]; 

    const is_right = (posts_count - page_size * (page_number + 1)) < 0
    const is_left = page_number === 0;
    
    // console.log(is_left);
    // console.log(is_right);
    res.render('contentList/page', {
      posts,
      user: req.session.user,
      title: "Hall of Fame",
      pagination: {
        is_left,
        is_right,
        page_number: page_number + 1,
      }
    });
}

module.exports = {
    main_get,
    waiting_room_get,
    hall_of_fame_get
};
