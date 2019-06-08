import * as React from 'react';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { Scene,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  PerspectiveCamera,
  ShaderMaterial,
  Vector2,
  TextureLoader,
  WebGLRenderer
} from 'three';

import './index.css';

class LiveStream extends React.Component {
  public componentDidMount() {
  
  }

  public render() {
    return (
      <div className="liveStream">

        <h2>Object Collection</h2>
        <h1>You Are Under Our Space Control</h1>
      </div>
    );
  }
}

export default LiveStream;
