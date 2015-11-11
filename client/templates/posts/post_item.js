// 返回首页
Template.postItem.helpers({
    // ownPost不能让你的帖子提供给其他用户去编辑
    ownPost: function() {
        return this.userId === Meteor.userId();
    },

    domain: function() {
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    }
});
