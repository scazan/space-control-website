import * as React from 'react';
import Draggable from 'react-draggable';
import { Scene,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  PerspectiveCamera,
  WebGLRenderer
} from 'three';

import './index.css';

const planets: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
const onHover = () => {
  document.body.classList.add('active');
};
const onHoverOut = () => {
  document.body.classList.remove('active');
};

class Home extends React.Component {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
    const scene = new Scene();
    const camera = new PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
    camera.position.z = 2750;
    const geometry = new PlaneBufferGeometry( 5, 20, 32 );
    const material = new MeshBasicMaterial( {color: 0xffff00, side: DoubleSide} );
    const plane = new Mesh( geometry, material );

    const renderer = new WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    const container = document.querySelector('.backing');
    container && container.appendChild( renderer.domElement );
    scene.add( plane );
  }

  public render() {
    return (
      <div className="home">

        <h2>Object Collection</h2>
        <h1>You Are Under Our Space Control</h1>
        <div className="info">
          <p>Thursday<br/>June 20<br/>7:30pm</p>
          <p>Friday<br/>June 21<br/>7:30pm</p>
          <p>Saturday<br/>June 22<br/>7:30pm</p>
        </div>

        <div className="tickets"
          onMouseOver={onHover}
          onMouseOut={onHoverOut}
        >
          <a href="https://web.ovationtix.com/trs/pr/1012213" target="_blank">Tickets</a>
        </div>

        <div className="backing" ref={planets}>
        </div>
      </div>
    );
  }
}

export default Home;
