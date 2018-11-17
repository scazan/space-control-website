import * as React from 'react';
import './index.css';

var localStream: any;
// var remoteVideo: any;
var peerConnection: any;
var uuid: any;
var serverConnection: any;

const peerConnectionConfig = {
  'iceServers': [
    {'urls': 'stun:stun.stunprotocol.org:3478'},
    {'urls': 'stun:stun.l.google.com:19302'},
  ]
};

const start = (isCaller: boolean) => {
  peerConnection = new RTCPeerConnection(peerConnectionConfig);
  peerConnection.onicecandidate = gotIceCandidate;
  peerConnection.ontrack = gotRemoteStream;
  peerConnection.addStream(localStream);

  if(isCaller) {
    peerConnection.createOffer().then(createdDescription).catch(errorHandler);
  }
};

const gotMessageFromServer = (message: { data: string }) => {
  if(!peerConnection) start(false);

  var signal = JSON.parse(message.data);

  // Ignore messages from ourself
  if(signal.uuid == uuid) return;

  if(signal.sdp) {
    peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(function() {
      // Only create answers in response to offers
      if(signal.sdp.type == 'offer') {
        peerConnection.createAnswer().then(createdDescription).catch(errorHandler);
      }
    }).catch(errorHandler);
  } else if(signal.ice) {
    peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(errorHandler);
  }
};

const gotIceCandidate = (event: any) => {
  if(event.candidate != null) {
    serverConnection.send(JSON.stringify({'ice': event.candidate, 'uuid': uuid}));
  }
};

const createdDescription = (description: string) => {
  console.log('got description');

  peerConnection.setLocalDescription(description).then(function() {
    serverConnection.send(JSON.stringify({'sdp': peerConnection.localDescription, 'uuid': uuid}));
  }).catch(errorHandler);
};

const gotRemoteStream = (event: any) => {
  console.log('got remote stream');
  // remoteVideo.srcObject = event.streams[0];
};

const errorHandler = (error: any) => {
  console.log(error);
};

// Taken from http://stackoverflow.com/a/105074/515584
// Strictly speaking, it's not a real UUID, but it gets the job done here
const createUUID = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};



class Broadcaster extends React.Component {
  private videoEl: any;

  public constructor(props:any) {
    super(props);

    this.videoEl = React.createRef();
    this.initRTC(this.videoEl);
  }

  initRTC(localVideo: HTMLVideoElement) {
    uuid = createUUID();

    serverConnection = new WebSocket('wss://' + window.location.hostname + ':3000');
    serverConnection.onmessage = gotMessageFromServer;

    const constraints = {
      video: true,
      audio: true,
    };

    const getUserMediaSuccess = (stream: any) => {
      localStream = stream;
      localVideo.srcObject = stream;
    };

    if(navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(getUserMediaSuccess).catch(errorHandler);
    } else {
      alert('Your browser does not support getUserMedia API');
    }
  };

  public render() {
    return (
      <div className="broadcaster">
        <video ref={ this.videoEl }></video>
      </div>
    );
  }
}

export default Broadcaster;
