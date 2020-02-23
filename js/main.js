'use strict';
document.querySelector('.map').classList.remove('map--faded');
var rooms = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var adverts = [];
var pins = document.querySelector('.map__pins');
var randomCountArray = function (arr) {
  var arrLocal = [];
  for (var i = 0; i < Math.floor(Math.random() * arr.length); i++) {
    arrLocal[i] = arr[i];
  }
  return arrLocal;
}
var renderAdverts = function (arr) {
  // Цикл, идущий по массиву и создающий объекты
  for (var i = 0; i < 8; i++) {
    arr[i] = {
      author : {
        avatar : 'img/avatars/user0' + (i + 1) + '.png',
      },
      location : {
        x : Math.floor(Math.random() * 1200),
        y : Math.floor(Math.random() * 500) + 130
      },
      offer : {
        title : 'Какой-то заголовок',
        price : Math.ceil(Math.random() * 5000),
        types : rooms[Math.floor(Math.random() * 4)],
        rooms : Math.ceil(Math.random() * 10),
        guests : Math.ceil(Math.random() * 5),
        checkin : checkinTimes[Math.floor(Math.random() * 3)],
        checkout : checkinTimes[Math.floor(Math.random() * 3)],
        description : 'Random text',
        features : randomCountArray(featuresArr),
        photos : randomCountArray(photos),
        adress : location.x + ', ' + location.y,
      }
    };
  }
}
renderAdverts(adverts);
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var renderElem = function () {
  for (var i = 0; i < 8; i++) {
    var pin = templatePin.cloneNode(true);
    pin.style.top = (adverts[i].location.y + PIN_HEIGHT) + 'px';
    pin.style.left = (adverts[i].location.x + PIN_WIDTH / 2) +  'px';
    var photo = pin.querySelector('img');
    photo.src = adverts[i].author.avatar;
    photo.alt = adverts[i].offer.title;
    fragment.appendChild(pin);
  };
}
renderElem();
pins.appendChild(fragment);


