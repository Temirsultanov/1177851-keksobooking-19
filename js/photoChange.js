;(function(){
  'use strict';
  var TYPE_FILES = ['gif', 'png', 'jpeg', 'jpg', 'svg'];
  var addForm = document.querySelector('.ad-form')
  var changePhoto = function(input, photo) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = TYPE_FILES.some(function(el){
      return fileName.endsWith(el);
    })
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function(){
        photo.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };




  var avatarInput = addForm.querySelector('#avatar');
  var avatarPhoto = addForm.querySelector('.ad-form-header__preview img');
  var onAvatarChange = function () {
    changePhoto(avatarInput, avatarPhoto);
  };
  avatarInput.addEventListener('change', onAvatarChange);




  var homePhoto = addForm.querySelector('.ad-form__photo img');
  var homeInput = addForm.querySelector('#images');
  var onHomePhotoChange = function () {
    changePhoto(homeInput, homePhoto);
  };
  homeInput.addEventListener('change', onHomePhotoChange);


})();
