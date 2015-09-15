// create webrtc connection
var webrtc =  new $xirsys.simplewebrtc(
  xirsysConnect.token_url,
  xirsysConnect.ice_url,
  xirsysConnect.room_url
);


// Make webrtc connection
webrtc.connect(xirsysConnect.data, {
  localVideoEl: 'localVideo',
  remoteVideosEl: 'remotesVideos',
  autoRequestMedia: true,
  debug: true,
  detectSpeakingEvents: true,
  autoAdjustMic: false
});


// grab the room from the URL
var room = location.search && location.search.split('?')[1];

console.log('room --> ', room);


// when it's ready, join if we got a room from the URL
webrtc.on('readyToCall', function() {
  if (room) webrtc.joinRoom(room);
});



webrtc.on('videoAdded', function(video, peer) {

  console.log('video added', peer);

  var remotes = document.getElementById('remotes');

  if (remotes) {
    var d = document.createElement('div');
    d.className = 'videoContainer';
    d.id = 'container_' + webrtc.getDomId(peer);
    d.appendChild(video);
    remotes.appendChild(d);
  }

});



webrtc.on('videoRemoved', function(video, peer) {
  console.log('video removed ', peer);
  var remotes = document.getElementById('remotes');
  var el = document.getElementById('container_' + webrtc.getDomId(peer));
  if (remotes && el) {
    remotes.removeChild(el);
  }
});


var roomFixedName = room.toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');

webrtc.createRoom(roomFixedName, function(err, name) {
  console.log('Created room cb', arguments);
});
