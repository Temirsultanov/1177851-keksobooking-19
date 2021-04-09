'use strict';
(function () {
  var PIN_HEIGHT = 64;
  var PIN_WIDTH = 81;
  var mainPin = document.querySelector('.map__pin');
  var addressInput = document.querySelector('.notice #address')
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      onActiveToggle();
      var startCoord = {
        x : evt.clientX,
        y : evt.clientY,
      };
      var onMouseMovePin = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x : startCoord.x - moveEvt.clientX,
          y : startCoord.y - moveEvt.clientY,
        };
        startCoord = {
          x : moveEvt.clientX,
          y : moveEvt.clientY,
        };
        if (mainPin.offsetTop - shift.y > 129 && mainPin.offsetTop - shift.y < 631) {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }
        if ( mainPin.offsetLeft - shift.x < 1169 && mainPin.offsetLeft - shift.x >= -32) {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }
        addressInput.value = (mainPin.style.top.slice(0, mainPin.style.top.indexOf('p', 0)) * 1 + 81 - 211) + ', ' + (mainPin.style.left.slice(0, mainPin.style.left.indexOf('p', 0)) * 1 + 32);
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMovePin);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMovePin);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      onActiveToggle();
    }
  });
})();
