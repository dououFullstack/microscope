Template.layout.helpers({
  pageTitle: function() {
    Session.set('pageTitle', 'A brand new title');
    return Session.get('pageTitle');
  }
});

// 每次 Session 变量发生变化的时候引发新的警报（alert）
Tracker.autorun(function() {
  alert(Session.get('message'));
});
