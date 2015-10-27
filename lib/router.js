//告诉路由器使用我们刚刚创建的 layout 模板作为所有路由的默认布局。
// Router.configure({
//   layoutTemplate: 'layout'
// });

//告诉路由器使用我们刚刚创建的 layout 模板作为所有路由的默认布局。
//并把 posts 订阅从 main.js 移到路由文件中
Router.configure({
  layoutTemplate: 'layout',
  //在路由调用模板准备好前，显示一个 loding 加载模板
  loadingTemplate: 'loading',
  //指向notfound模板
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('posts');
  }
});

//定义了一个名为 postsList 的路由规则，并映射到 / 路径
Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
  //:_id 标记告诉路由器两件事：
  //第一，去匹配任何符合 /posts/xyz/（“xyz”可以是任意字符）格式的路线。
  //第二，无论“xyz”里面是什么，都会把它放到路由器的 params 数组中的 _id 属性里面去。
  name: 'postPage',
  // 我们可以从 URL 上获取 _id ，并通过它找到我们的帖子从而获得正确的数据源

  //在路由规则的 data 方法里面，this 对应于当前匹配的路由对象，
  //我们可以使用 this.params 去访问一个比配项（在 path 中通过 : 前缀去表示它们）。
  data: function() {
    return Posts.findOne(this.params._id);
    //findOne 返回的是一个与查询相匹配的帖子，
    //而仅仅需要提供一个 id 作为参数，它可以简写成 {_id: id} 。
  }
});

//为新帖子的提交页面定义一个路由
Router.route('/submit', {name: 'postSubmit'});

// 检查用户是否登录，如果他们没有登录，
// 呈现出来的是 accessDenied 模板而不是 postSubmit 模板。
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});


//解决用户虽然输入了合法路由但是没有指向任何数据的问题
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
