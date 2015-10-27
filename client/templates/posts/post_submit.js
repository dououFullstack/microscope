Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    //直接插入到 Posts 集合的方法
    // post._id = Posts.insert(post);
    // Router.go('postPage', post);

    //将调用一个名为 postInsert 的内置方法：插入
    Meteor.call('postInsert', post, function(error, result) {
      // 显示错误信息并退出
      if (error)
        return alert(error.reason);
      // 显示结果，跳转页面
      if (result.postExists)
        alert('This link has already been posted（该链接已经存在）');
        // go() 方法将构建一个帖子页面的 URL 提供我们访问
      Router.go('postPage', {_id: result._id});
      });
  }
});

// 表单的 submit 事件。
// 最好使用 submit 事件
// （而不是按钮的 click 事件），
// 因为这会覆盖所有可能的提交方式（比如敲击回车键）。如敲击回车键）。
