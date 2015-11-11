// 建立一个叫 Posts 的集合来存储posts帖子
Posts = new Mongo.Collection('posts');

 // Meteor 方法会绕过它们,所以注释掉下面检查方法
 //
// Posts.allow({
//   insert: function(userId, doc) {
//     // 只允许登录用户添加帖子
//     return !! userId;
//   }
// });
// Posts.allow 是告诉 Meteor：
// 这是一些允许客户端去修改帖子集合的条件。
// 上面的代码，等于说“只要客户拥有 userId 就允许去插入帖子”。
// 这个拥有 userId 用户的修改会传递到 allow 和 deny 的方法
// （如果没有用户登录就返回 null），这个判断通常都是准确的。
// 因为用户帐户是绑定到 Meteor 核心里面的，我们可以依靠 userId 去判断。

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    //使用 isServer询问 Meteor 这部分代码是否在服务器端执行。
    //如果是，我们会在帖子的标题后面添加 (server) 字符串。如果不是，我们将添加 (client) 字符串：
    if (Meteor.isServer) {
      postAttributes.title += "(server)";
      // wait for 5 seconds
      Meteor._sleepForMs(5000);
    } else {
      postAttributes.title += "(client)";
    }


    // 检查url是否重复,如果找到，
    // 我们 return 返回那帖子的 _id 和 postExists: true
    // 来让用户知道这个特别的情况
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
