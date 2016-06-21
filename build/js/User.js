function User(data){
  var self = this;
  this.attributes = ['name', 'email', 'password', 'bio'];
  this.attributes.forEach(function(attribute){
    self[attribute] = data[attribute];
  });
}

User.prototype.login = function(password){
  return this.decryptPassword(this.password) == password;
};

User.prototype.encryptPassword = function(password){
  var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+';
  return password.split('').map(function(char){ return alpha[ (alpha.indexOf(char) + (alpha.length / 2)) % alpha.length]; }).join('');
};

User.prototype.decryptPassword = function(password){
  var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+';
  return password.split('').map(function(char){ return alpha[ (alpha.length + (alpha.indexOf(char) - (alpha.length / 2))) % alpha.length]; }).join('');
};
