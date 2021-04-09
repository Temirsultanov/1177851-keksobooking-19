'use strict';
var PIN_WIDTH = 64;
var PIN_HEIGHT = 81;
var MAINPIN_SIZE = 64;
var ADVERTS_COUNT = 8;
// Различные массивы, из которых потом будет собираться карточка объявления
var rooms = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
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
// Массив карточек объявлений
var adverts = [];
// Нахожу обертку пинов | шаблон пина в разметке | шаблон карточки | главный пин
var pins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var mainPin = document.querySelector('.map__pin--main');
// Создаю фрагмент пина и карты объявлений
var fragmentPin = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();
var map = document.querySelector('.map');
var cards;
var pins;
var fieldsets = document.querySelectorAll('.ad-form fieldset, .map__filters fieldset, .map__filters select');
var addressInput = document.querySelector('#address');
var addForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');


// Рандомное число от 1 до n
var ceilRandom = function (n) {
  return Math.ceil(Math.random() * n)
}
// Рандомное число от 0 до n-1
var floorRandom = function (n) {
  return Math.floor(Math.random() * n)
}
// Функция, которая на вход получает массив и выводит перемешанный массив рандомной длины
var randomCountArray = function (arr) {

  var arrLocal = [];
  // Создаю копию массива
  var arrCopy = arr.slice(0, arr.length);
  // Рандомное число от 1 до длины массива
  var randomLength = ceilRandom(arr.length);
  // Цикл, создающий новый массив.
  for (var i = 0; i < randomLength; i++) {
    // Находим рандомное число от 0 до длины массива - 1 (индексы элементов)
    var randomNumber = floorRandom(arrCopy.length);
    // Копируем в новый массив элемент с рандомным индексом
    arrLocal[i] = arrCopy[randomNumber];
    // Удаляем элемент с этим рандомным индексом, чтоб элементы в новом массиве не повторялись
    arrCopy.splice(randomNumber, 1);
  }

  return arrLocal;
}
// Функция, создающая карточки объявлений. На вход получает пустой массив и выводит массив из объектов
var renderAdverts = function (arr) {
  for (var i = 0; i < ADVERTS_COUNT; i++) {
    var obj = {
      author : {
        avatar : 'img/avatars/user0' + (i + 1) + '.png',
      },
      location : {
        x : floorRandom(1201),
        y : floorRandom(431) + 130 + 70
      },
      offer : {
        title : titles[floorRandom(titles.length)],
        price : ceilRandom(5000),
        types : rooms[floorRandom(4)],
        rooms : ceilRandom(10),
        guests : ceilRandom(5),
        checkin : checkinTimes[floorRandom(3)],
        checkout : checkinTimes[floorRandom(3)],
        description : descriptions[floorRandom(descriptions.length)],
        features : randomCountArray(featuresArr),
        photos : randomCountArray(photos),
      }
    };
    obj.offer.address = obj.location.x + ', ' + obj.location.y;
    arr[i] = obj;
  }
}
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
var renderCards = function () {
  for (var i = 0; i < adverts.length; i++) {
    var card = templateCard.cloneNode(true);
    card.querySelector('.popup__title').textContent = adverts[i].offer.title;
    card.querySelector('.popup__text--address').textContent = adverts[i].offer.address;
    card.querySelector('.popup__text--price').textContent = adverts[i].offer.price + '₽/ночь';
    switch (adverts[i].offer.types) {
      case 'flat':
        card.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo':
        card.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house':
        card.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        card.querySelector('.popup__type').textContent = 'Дворец';
        break;
      default:
        throw new Error('Тип дома не тот');
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
      listFeature[featuresArr.indexOf(adverts[i].offer.features[j], 0)].textContent = adverts[i].offer.features[j];
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
  return fragmentCard;
}

var onNotActiveToggle = function () {
  map.classList.add('map--faded');
  addForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
  for(var j = 0; j < cards.length; j++) {
    cards[j].style.display = 'none';
  }
  for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
  };
  addressInput.setAttribute('readonly', 'readonly');
  addressInput.value = mainPin.style.top.slice(0, 3) * 1 + MAINPIN_SIZE / 2 + ', ' + (mainPin.style.left.slice(0, 3) * 1 + MAINPIN_SIZE / 2);
}
renderAdverts(adverts);
pins.appendChild(renderPins());
map.appendChild(renderCards());
cards = document.querySelectorAll('.map__card');

var onActiveToggle = function () {
  map.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  };
  addressInput.value = mainPin.style.top.slice(0, 3) * 1 + PIN_HEIGHT + ', ' + (mainPin.style.left.slice(0, 3) * 1 + PIN_WIDTH / 2);
  pins = document.querySelectorAll('.map__pin');
  for (var j = 1; j < pins.length; j++) {
    var pin = pins[j];
    var card = cards[j - 1];
    addPinClick(pin, card);
  }
}
var onPinClick = function (pin, card) {
  for (var i = 1; i < pins.length; i++) {
    cards[i - 1].style.display = 'none';
    pins[i].classList.remove('map__pin--active');
  }
  card.style.display = 'block';
  pin.classList.add('map__pin--active');
}
var onPopupCloseButton = function (card) {
  card.style.display = 'none';
  for (var i = 1; i < pins.length; i++) {
    cards[i - 1].style.display = 'none';
    pins[i].classList.remove('map__pin--active');
  }
}
var addPinClick = function (pin, card) {
  pin.addEventListener('click', function(){
    onPinClick(pin, card);
    var closeButton = card.querySelector('.popup__close');
    document.addEventListener('keydown', function(evt){
      if (evt.key === 'Escape') {
        onPopupCloseButton(card);
      }
    })
    closeButton.addEventListener('click', function(){
      onPopupCloseButton(card);
    })
  });
}
onNotActiveToggle();

var sendData = function () {
  var xhr = new XMLHttpRequest();
  var addFormData = new FormData(document.querySelector('.ad-form'));
  xhr.open('POST', 'https://js.dump.academy/keksobooking');
  xhr.send(addFormData);
};
var submitButton = document.querySelector('.ad-form__submit');
var onSubmitButtonClick = function (evt) {
  evt.preventDefault();
  if (true) {
    sendData();
  }
};
submitButton.addEventListener('click', onSubmitButtonClick);
