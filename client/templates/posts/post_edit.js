Template.postEdit.events({
// 表单的 submit 事件
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

// 将从表单中获取相关字段的值，
// 并存储在 postProperties 的对象中
    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // 向用户显示错误信息
        alert(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

// 删除链接的 click 事件
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});
