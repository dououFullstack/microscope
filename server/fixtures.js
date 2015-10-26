if (Posts.find().count() === 0) {
  Posts.insert({
    title: '苏珊',
    url: 'http://github.com'
  });

  Posts.insert({
    title: '豆豆',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: '苏丹',
    url: 'http://baidu.com'
  });
}
