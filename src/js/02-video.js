import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);

const timeFunction = function (data) {
  let playerSecond = data.seconds;
  console.log(playerSecond);
  localStorage.setItem('videoplayer-current-time', playerSecond);
};

player.on('timeupdate', throttle(timeFunction, 1000));

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        // other error
        break;
    }
  });
