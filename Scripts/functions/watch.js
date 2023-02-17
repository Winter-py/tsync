// Set up the video player
const video = document.getElementById('my-video');

// Set up the signaling server
const socket = io();

// When the video starts playing, synchronize the clocks of the two clients
video.addEventListener('play', () => {
  const serverTime = getServerTime(); // You'll need to implement this function
  socket.emit('sync', serverTime);
});

// When the server sends an update, adjust the video playback time
socket.on('update', (serverTime) => {
  const clientTime = Date.now();
  const timeDiff = clientTime - serverTime;
  video.currentTime += timeDiff / 1000; // Convert milliseconds to seconds
});

// When the video playback time updates, send the update to the server
video.addEventListener('timeupdate', () => {
  const clientTime = Date.now();
  socket.emit('update', clientTime);
});
