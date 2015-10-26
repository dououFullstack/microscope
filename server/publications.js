//简单的发布
Meteor.publish('posts', function() {
  return Posts.find(); 发布所有posts

  //客户端无法订阅打了标记的posts
  //通过DDP协议实现此功能
  // return Posts.find({flagged: false});
});

//加了参数的发布(author)
// Meteor.publish('posts', function(author) {
  // return Posts.find(); 发布所有posts

  //客户端无法订阅打了标记的posts
  //通过DDP协议实现此功能
  // return Posts.find({author: author});
// });
