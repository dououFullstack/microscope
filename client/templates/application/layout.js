//set pageTitle
Template.layout.helpers({
  pageTitle: function() {
    Session.set('pageTitle', 'A brand new title');
    return Session.get('pageTitle');
  }
});

// 每次 Session 变量发生变化的时候引发新的警报（alert）
Tracker.autorun(function() {
  alert(Session.get('pageTitle'));
});


// Computations 代码块是根据响应式数据的变化去运行。
// 如果你有一个响应式数据源（例如，一个 Session 变量）
// 并且希望及时去响应它，你需要建立一个 Computations。
Meteor.startup(function() {
  Tracker.autorun(function() {
    console.log('There are ' + Posts.find().count() + ' posts');
  });
//此函数 只要posts数量有变化就可主动输出console.log
});
