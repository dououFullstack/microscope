// 移除了 insecure 包后所有客户端的修改都会被拒绝。
// 所以要设置权限文件
// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}
