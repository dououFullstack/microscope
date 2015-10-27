Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    post._id = Posts.insert(post);
// go() 方法将构建一个帖子页面的 URL 提供我们访问
    Router.go('postPage', post);
  }
});

// 表单的 submit 事件。
// 最好使用 submit 事件
// （而不是按钮的 click 事件），
// 因为这会覆盖所有可能的提交方式（比如敲击回车键）。如敲击回车键）。
