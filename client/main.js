Meteor.subscribe('posts');

//服务端pblication时加了参数,这里subscribe时就需要传参
//这样的话，你就可以避免消耗大量的客户端内存，无论服务器端的总数据量有多大。
//客户端能够具有可伸缩性：不去订阅全部数据，而是指选择你现在需要的数据去订阅。
Meteor.subscribe('posts', 'doudou');

// Autopublish : Publish all data to Client for Server

// 返回作者为doudou的用户的posts
// Template.posts.helpers({
//   posts: function(){
//     return Posts.find({author: 'doudou', category: 'JavaScript'});
//   }
// });
