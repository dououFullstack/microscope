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
    return Posts.find();
  }
});
