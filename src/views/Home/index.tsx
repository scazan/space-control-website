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
import albumBackImage from './images/back_email.jpg';
import albumFrontImage from './images/album_front.jpg';
import fragmentShader from './frag.js';
import vertexShader from './vert.js';

import './index.css';

let followMouse = false;
let timeout: any;
const planets: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
const onHover = () => {
  if(!followMouse) {

    timeout = setTimeout(() => {
      document.body.classList.add('active');

      planets.current && (planets.current.style.position = 'fixed');
      document.body.style.paddingBottom = '170px';
      followMouse = true;
    }, 300);
  }
};
const onHoverOut = () => {
  if(timeout) {
    clearTimeout(timeout);
  }
  // document.body.classList.remove('active');
};

let mouseX = '0px';
let mouseY = '0px';
let priorMouseX = '0px';
let priorMouseY = '0px';

const followMousePosition = (e) => {
  priorMouseX =  mouseX;
  priorMouseY = mouseY;

  mouseX = `${e.clientX - 85}px`;
  mouseY = `${e.clientY-85}px`;
};

const updateMouseFollower = () => {
  if(followMouse) {
    if(
      planets.current
      && ((mouseX !== priorMouseX) || (mouseY !== priorMouseY))
    ) {
      planets.current.style.left = mouseX;
      planets.current.style.top = mouseY;
    }
  }
};

class Home extends React.Component {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
    document.body.onmouseover = followMousePosition;
    const scene = new Scene();
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 100);
    camera.position.set(0, 0, 0.3)

    const geometry = new PlaneBufferGeometry( 1, 1, 1, 1 );
    // const material = new MeshBasicMaterial( {color: 0xfffff0, side: DoubleSide} );
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load(albumBackImage);

    let time = 0;
    const material = new ShaderMaterial({
      side: DoubleSide,
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { type: 'f', value: time },
        pixels: { type: 'v2', value: new Vector2(window.innerWidth, window.innerHeight) },
        accel: { type: 'v2', value: new Vector2(0.5, 2) },
        progress: { type: 'f', value: 1 },
        uvRate1: {
          value: new Vector2(1, 1)
        },
        texture1: {
          value: texture
        },
        texture2: {
          value: texture
        }
      }
    })



    const plane = new Mesh( geometry, material );

    const renderer = new WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    const container = document.querySelector('.backing');
    container && container.appendChild( renderer.domElement );
    scene.add( plane );

    const renderGL = () => {
      window.requestAnimationFrame(renderGL);
      time += 0.05;
      material.uniforms.progress.value += 0.000095;
      updateMouseFollower();
      renderer.render(scene, camera);
    };

    renderGL();
  }

  public render() {
    return (
      <div className="home">

        <h2>Object Collection</h2>
        <img
          className="albumCover"
          src={albumFrontImage}
          onMouseOver={onHover}
          onMouseOut={onHoverOut}
        />
        <h1>You Are Under Our Space Control</h1>

        <div className="info">
          <p>Thursday<br/>June 20<br/>7:30pm</p>
          <p>Friday<br/>June 21<br/>7:30pm</p>
          <p>Saturday<br/>June 22<br/>7:30pm</p>
        </div>

        <a href="//web.ovationtix.com/trs/pr/1012213" target="_blank">
        <div className="tickets"
          onMouseOver={onHover}
          onMouseOut={onHoverOut}
          ref={planets}
        >
          <a href="https://web.ovationtix.com/trs/pr/1012213" target="_blank">Tickets</a>
        </div>
      </a>

        <div className="backing">
        </div>
      </div>
    );
  }
}

export default Home;
