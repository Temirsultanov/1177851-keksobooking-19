'use strict';
document.querySelector('.map').classList.remove('map--faded');
var rooms = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var adverts = [];
var descriptions = [
  'Curabitur et vulputate metus. Sed quam lacus, molestie bibendum dui a, vestibulum accumsan ipsum. Duis ac laoreet tortor. Nunc rutrum dui in dolor hendrerit, in rutrum ante bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam bibendum mi sed nibh rhoncus, et lobortis est vulputate.',
  'Vestibulum tristique malesuada ligula, at elementum urna dapibus ut. Phasellus rhoncus purus ut viverra sodales. Vestibulum vitae velit nec tellus blandit dignissim nec eget dolor.',
  'Fusce scelerisque, elit non pulvinar fringilla, nisl justo porta nibh, vitae interdum augue orci non leo. Maecenas vel quam at eros aliquam aliquet. Sed vestibulum, justo in lacinia facilisis, urna mauris cursus enim, id condimentum augue velit eu urna.',
  'Nullam quam felis, molestie sed commodo vestibulum, tempus in massa. Aenean a ligula eu massa vulputate consequat eu nec arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent gravida orci eu dolor porttitor, ac egestas neque dapibus. Phasellus placerat odio quis consequat condimentum.',
  'Etiam et nisl id leo venenatis feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis ultricies metus laoreet gravida. Duis vehicula nisl a convallis ultrices.',
  'Proin placerat augue tortor, id dignissim odio rutrum nec. Mauris suscipit fringilla massa, ac condimentum elit aliquet sed. Maecenas sit amet orci non sapien consequat viverra id id libero.',
  'Fusce lacinia massa in dolor lacinia viverra. Quisque non turpis id nibh pulvinar pellentesque. Ut tempor quam luctus vestibulum lacinia. Donec ac tellus quis massa sodales condimentum.'
];
var titles = ['Suspendisse id congue libero, nec sodales elit', 'Praesent consectetur, tortor eu vehicula blandit', 'Уютное гнёздышко для молодоженов', 'Phasellus bibendum mi in erat gravida pellentesque', 'Onec ac tellus quis massa sodales condimentum.', 'Quisque ac ullamcorper metus', 'Duis vehicula nisl a convallis ultrices', 'Fusce aliquet consectetur augue in faucibus'];
var pins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var fragmentPin = document.createDocumentFragment();
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var fragmentCard = document.createDocumentFragment();
var randomCountArray = function (arr) {
  var arrLocal = [];
  var arrCopy = [];
  for (var j = 0; j<arr.length; j++) {
    arrCopy[j] = arr[j];
  }
  var randomLength = Math.ceil(Math.random() * (arr.length));
  for (var i = 0; i < randomLength; i++) {
    var randomNumber = Math.floor(Math.random() * arrCopy.length);
    arrLocal[i] = arrCopy[randomNumber];
    arrCopy.splice(randomNumber, 1);
  }
  return arrLocal;
}
var renderAdverts = function (arr) {
  for (var i = 0; i < 8; i++) {
    var obj = {
      author : {
        avatar : 'img/avatars/user0' + (i + 1) + '.png',
      },
      location : {
        x : Math.floor(Math.random() * 1200),
        y : Math.floor(Math.random() * 500) + 130
      },
      offer : {
        title : titles[Math.floor(Math.random() * titles.length)],
        price : Math.ceil(Math.random() * 5000),
        types : rooms[Math.floor(Math.random() * 4)],
        rooms : Math.ceil(Math.random() * 10),
        guests : Math.ceil(Math.random() * 5),
        checkin : checkinTimes[Math.floor(Math.random() * 3)],
        checkout : checkinTimes[Math.floor(Math.random() * 3)],
        description : descriptions[Math.floor(Math.random() * descriptions.length)],
        features : randomCountArray(featuresArr),
        photos : randomCountArray(photos),
      }
    };
    obj.offer.address = obj.location.x + ', ' + obj.location.y;
    arr[i] = obj;
  }
}
renderAdverts(adverts);
var renderPins = function () {
  for (var i = 0; i < 8; i++) {
    var pin = templatePin.cloneNode(true);
    pin.style.top = (adverts[i].location.y - PIN_HEIGHT) + 'px';
    pin.style.left = (adverts[i].location.x - PIN_WIDTH / 2) +  'px';
    var photo = pin.querySelector('img');
    photo.src = adverts[i].author.avatar;
    photo.alt = adverts[i].offer.title;
    fragmentPin.appendChild(pin);
  };
  return fragmentPin;
}
pins.appendChild(renderPins());
// Карточка пина

var renderCards = function () {
  for (var i = 0; i < adverts.length; i++) {
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = adverts[i].offer.title;
    card.querySelector('.popup__text--address').textContent = adverts[i].offer.address;
    card.querySelector('.popup__text--price').textContent = adverts[i].offer.price + '₽/ночь';
    if (adverts[i].offer.types === 'flat') {
      card.querySelector('.popup__type').textContent = 'Квартира';
    }
    else if (adverts[i].offer.types === 'bungalo') {
      card.querySelector('.popup__type').textContent = 'Бунгало';
    }
    else if (adverts[i].offer.types === 'house') {
      card.querySelector('.popup__type').textContent = 'Дом';
    }
    else if (adverts[i].offer.types === 'palace') {
      card.querySelector('.popup__type').textContent = 'Дворец';
    }
    card.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнаты для ' + adverts[i].offer.guests + ' гостей';
    if (adverts[i].offer.guests === 1) {
      if (adverts[i].offer.rooms % 10 === 1){
        card.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнатa для ' + adverts[i].offer.guests + ' гостя';
      }
      else if (adverts[i].offer.rooms % 10 === 2 || adverts[i].offer.rooms % 10 === 3 || adverts[i].offer.rooms % 10 === 4 ) {
        card.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнаты для ' + adverts[i].offer.guests + ' гостя';
      }
      else {
        card.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнат для ' + adverts[i].offer.guests + ' гостя';
      }
    }
    else{
      if (adverts[i].offer.rooms % 10 === 1){
        card.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнатa для ' + adverts[i].offer.guests + ' гостей';
      }
      else if (adverts[i].offer.rooms % 10 === 2 || adverts[i].offer.rooms % 10 === 3 || adverts[i].offer.rooms % 10 === 4 ) {
        card.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнаты для ' + adverts[i].offer.guests + ' гостей';
      }
      else {
        card.querySelector('.popup__text--capacity').textContent = adverts[i].offer.rooms + ' комнат для ' + adverts[i].offer.guests + ' гостей';
      }
    }
    card.querySelector('.popup__text--time').textContent = 'Заезд после '+ adverts[i].offer.checkin + ', выезд до '+ adverts[i].offer.checkout;
    var listFeature = card.querySelectorAll('.popup__feature');
    for (var j = 0; j < adverts[i].offer.features.length; j++) {
      listFeature[featuresArr.indexOf(adverts[i].offer.features[j], 0)].textContent = adverts[i].offer.features[j]
    }
    for (var j = 0; j < listFeature.length; j++) {
      if (listFeature[j].textContent == 0) {
        listFeature[j].remove();
      }
    }
    card.querySelector('.popup__description').textContent = adverts[i].offer.description;

    for (var c = 0; c < adverts[i].offer.photos.length; c++) {
    var photo = card.querySelector('.popup__photos > img').cloneNode(true);
    card.querySelector('.popup__photos').appendChild(photo);
    photo.src = adverts[i].offer.photos[c];
    }
    card.querySelector('.popup__photos > img').remove();
    card.querySelector('.popup__avatar').src = adverts[i].author.avatar;
    fragmentCard.appendChild(card);
  };
}
renderCards();

var map = document.querySelector('.map');
map.appendChild(fragmentCard);
var cards = document.querySelectorAll('.map__card');









