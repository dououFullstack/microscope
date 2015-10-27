// 建立一个叫 Posts 的集合来存储posts帖子
Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    // 只允许登录用户添加帖子
    return !! userId;
  }
});
// Posts.allow 是告诉 Meteor：
// 这是一些允许客户端去修改帖子集合的条件。
// 上面的代码，等于说“只要客户拥有 userId 就允许去插入帖子”。
// 这个拥有 userId 用户的修改会传递到 allow 和 deny 的方法
// （如果没有用户登录就返回 null），这个判断通常都是准确的。
// 因为用户帐户是绑定到 Meteor 核心里面的，我们可以依靠 userId 去判断。
