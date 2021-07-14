let mute = false;
let mystream;

// client creation
let client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

// initialized the client
client.init("1c1a4395972e40d8ae0fc315182fe11e");

// creating the channel
client.join("0061c1a4395972e40d8ae0fc315182fe11eIACog3orxDBqYPpiRd+YbBSJX+9QRQyLkrjoBIdSgxn7Xx4i22gAAAAAEAC4541ovtjvYAEAAQBU2u9g","Video Chat App demo",null,
  (uid) => {
    // Create a local stream
    let localStream = AgoraRTC.createStream({
      audio: true,
      video: true,
    });
    localStream.init(() => {
      mystream = localStream;
      localStream.play("local");
      client.publish(localStream);
    });
  }
);

client.on("stream-added", function (evt) {
  client.subscribe(evt.stream);
});

client.on("stream-subscribed", function (evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  let right = document.getElementById("remote");
  let div = document.createElement("div");
  div.id = streamId;
  right.appendChild(div);
  stream.play(streamId);
});

function muteAudio() {
  mystream.muteAudio();
}

function unmuteAudio() {
  mystream.unmuteAudio();
}