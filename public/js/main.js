// create webrtc connection
var webrtc =  new $xirsys.simplewebrtc(
  xirsysConnect.token_url,
  xirsysConnect.ice_url,
  xirsysConnect.room_url
);

var connectionProperties = xirsysConnect.data;

webrtc.connect(connectionProperties, {
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



// Since we use this twice we put it here
function setRoom(name) {
  $('form').remove();
  $('h1').text(name);
  $('#subTitle').text('Link to join: ' + location.href);
  $('body').addClass('active');
}



if (room) {
  setRoom(room);
}
else {

  $('form').submit(function() {
    var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');

    webrtc.createRoom(val, function(err, name) {

      console.log('create room cb', arguments);

      var newUrl = location.pathname + '?' + val;

      if (!err) {

        history.replaceState({
          foo: 'bar'
        }, null, newUrl);

        setRoom(name);

      }
      else {
        console.log(err);
      }
    });
    return false;
  });

}
