declare const JSMpeg: any;
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Rnd }  from 'react-rnd';
import ScoreThree  from '../../components/ScoreThree/index';

import 'normalize.css';
import './index.css';

const leftOffset = 100;
const canvasWidth: number = 1920;
const canvasWidthDivider: number = 8;
const canvasHeight: number = 1080;

class LiveStream extends React.Component<{}, {overlayHidden: boolean}> {
  public constructor(props) {
    super(props);

    this.state = {
      overlayHidden: false,
    };

    this.removeOverlay = this.removeOverlay.bind(this);
  }
  removeOverlay() {
    this.setState({
      overlayHidden: true,
    });
  }
  public componentDidMount() {
    const cameraHost = '172.104.27.38';

    const player = new JSMpeg.Player(`ws://${cameraHost}:8082/`, {
      canvas: document.getElementById('camera1'),
      audio: false,
    });
    const player2 = new JSMpeg.Player(`ws://${cameraHost}:8083/`, {
      canvas: document.getElementById('camera2'),
      audio: false,
    });
    const player3 = new JSMpeg.Player(`ws://${cameraHost}:8084/`, {
      canvas: document.getElementById('camera3'),
      audio: true,
    });
  }

  public render() {
    const rand1 = Math.random() * 200;
    const rand2 = Math.random() * 200;
    const rand3 = Math.random() * 200;

    const hiddenClass = this.state.overlayHidden ? 'hidden' : null;
    return (
      <div className="liveStream">
        <h1 className="showTitle">You Are Under Our Space Control</h1>
        <Rnd>
          <section className="textAreaOne textArea">
            <ScoreThree />
          </section>
        </Rnd>

        <Rnd
          lockAspectRatio={true}
          default={{
            x: Math.random() * (window.innerHeight/1.5),
            y: Math.random() * (window.innerHeight/1.5),
              width: (canvasWidth/canvasWidthDivider) - rand1,
            height: (((canvasWidth/canvasWidthDivider) - rand1)/canvasWidth) * canvasHeight,
          }}
        >
          <canvas
            id="camera1"
            className="camera sourceCanvas"
            width={canvasWidth}
            height={canvasHeight}
          />
        </Rnd>
        <Rnd
          lockAspectRatio={true}
          default={{
            x: Math.random() * (window.innerHeight/1.5),
            y: Math.random() * (window.innerHeight/1.5),
            width: (canvasWidth/canvasWidthDivider) - rand2,
            height: (((canvasWidth/canvasWidthDivider) - rand2)/canvasWidth) * canvasHeight,
          }}
        >
          <canvas
            id="camera2"
            className="camera camera2Canvas"
            width={canvasWidth}
            height={canvasHeight}
          />
        </Rnd>

        <Rnd
          lockAspectRatio={true}
          default={{
            x: Math.random() * (window.innerHeight/1.5),
            y: Math.random() * (window.innerHeight/1.5),
            width: (canvasWidth/canvasWidthDivider) - rand3,
            height: (((canvasWidth/canvasWidthDivider) - rand3)/canvasWidth) * canvasHeight,
          }}
        >
          <canvas
            id="camera3"
            className="camera"
            width={canvasWidth}
            height={canvasHeight}
          />
        </Rnd>

        <div className={`instructionOverlay ${hiddenClass}`}>
          <div className="info">
            The camera feeds are moveable and resizable. If you need one to be bigger, grab it by a corner and drag!
            <button
              className={`start`}
              onClick={this.removeOverlay}
            >
              Start Streaming!
            </button>
        </div>
        </div>
      </div>
    );
  }
}

export default LiveStream;
