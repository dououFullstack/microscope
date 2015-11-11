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

//现在我们要在客户端编辑和删除帖子所以添加allow
Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

//限制编辑
//用 Meteor 的 deny() 方法，
//以确保用户只能编辑特定的字段：
Posts.deny({
  update: function(userId, post, fieldNames) {
    // 只能更改如下两个字段：
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
// 代码中的 fieldNames 数组，它包含了需要被修改的字段，
// 并使用 Underscore 的 without() 方法返回一个不包含 url 和 title 字段的子数组。
// 正常情况下，这个数组应该是空的，它的长度应该是0。
// 如果有人采取其他操作，这个数组的长度将变为1或更多，
// 回调函数将返回 true （因此禁止更新）。
});

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

// 内置方法的回调 vs 客户端数据操作
// 创建帖子，我们使用的是 postInsert 的内置方法，
// 而编辑和删除帖子，我们直接在客户端调用 update 和 remove，
// 并通过 allow 和 deny 去限制使用权限。
// 我们该如何去选择使用呢？
// 当操作相对比较直观，你可以通过 allow 和 deny 去设置
// 你的规则的时候，直接在客户端进行操作通常会更简单。
// 然而，一旦你需要做一些在用户控制以外的事情
// （比如设置一个新帖子的时间戳，或者把帖子分配到正确的用户），
// 这种情况使用内置方法会更好。
// 内置方法也适用在其他的一些情景：
// 当你需要通过内置方法的回调函数去获得返回值的时候，
// 而不是等待响应和同步才传递的数据。
// 对于一些繁重的数据库操作，比如要提取大量的数据集合。
// 计算或者合计数据的时候（比如：计数、平均值、求和）。
