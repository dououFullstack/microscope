//手动添加的数据用于做演示
// var postsData = [
//   {
//     title: 'Introducing Telescope',
//     url: 'http://sachagreif.com/introducing-telescope/'
//   },
//   {
//     title: 'Meteor',
//     url: 'http://meteor.com'
//   },
//   {
//     title: 'The Meteor Book',
//     url: 'http://themeteorbook.com'
//   }
// ];

//模板方法  替换掉上面的postsDate对象 然后成为一个动态的集合
Template.postsList.helpers({
  //直接使用手动添加数据方法
  // posts: postsData

  //动态集合
  posts: function() {
    // Mongo 数据库的 sort 运算方法，根据这个字段去把对象进行排序，
    // 并且标识它们是升序还是降序。
    return Posts.find({}, {sort: {submitted: -1}});
  }
});
