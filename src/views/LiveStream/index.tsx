import * as React from 'react';
import { Link } from 'react-router-dom';
import { Rnd }  from 'react-rnd';
import jsmpeg from 'jsmpeg';

import 'normalize.css';
import './index.css';

const leftOffset = 100;
const canvasWidth: number = 1920;
const canvasWidthDivider: number = 4;
const canvasHeight: number = 1080;

class LiveStream extends React.Component {
  private sourceCanvas: any;
  private camera2Canvas: any;
  private camera3Canvas: any;

  constructor(props) {
    super(props);

    this.sourceCanvas = React.createRef();
    this.camera2Canvas = React.createRef();
    this.camera3Canvas = React.createRef();
  }

  public componentDidMount() {
    const cameraHost = '172.104.27.38';
    const client = new WebSocket(`ws://${cameraHost}:9999`);
    const client2 = new WebSocket(`ws://${cameraHost}:9998`);
    const client3 = new WebSocket(`ws://${cameraHost}:9997`);

    const player = new jsmpeg(client, {
      canvas: this.sourceCanvas.current,
    });
    const player2 = new jsmpeg(client2, {
      canvas: this.camera2Canvas.current,
    });
    const player3 = new jsmpeg(client3, {
      canvas: this.camera3Canvas.current,
    });
  }

  public render() {
    const rand1 = Math.random() * 100;
    const rand2 = Math.random() * 100;
    const rand3 = Math.random() * 100;
    return (
      <div className="liveStream">
        <h1 className="showTitle">You Are Under Our Space Control</h1>

        <Rnd>
          <section className="textAreaOne textArea">
            this is where I may see some of the word type of pieces being executed
          </section>
        </Rnd>

        <Rnd
          lockAspectRatio={true}
          default={{
            x: Math.random() * (window.innerHeight/2),
            y: Math.random() * (window.innerHeight/2),
              width: (canvasWidth/canvasWidthDivider) - rand1,
              height: (canvasHeight/canvasWidthDivider) - rand1,
          }}
        >
          <canvas
            className="camera sourceCanvas"
            ref={this.sourceCanvas}
            width={canvasWidth}
            height={canvasHeight}
          />
        </Rnd>
        <Rnd
          lockAspectRatio={true}
          default={{
            x: Math.random() * (window.innerHeight/2),
            y: Math.random() * (window.innerHeight/2),
            width: canvasWidth/canvasWidthDivider,
            height: canvasHeight/canvasWidthDivider,
          }}
        >
          <canvas
            className="camera camera2Canvas"
            ref={this.camera2Canvas}
            width={canvasWidth}
            height={canvasHeight}
          />

        </Rnd>
        <Rnd
          lockAspectRatio={true}
          default={{
            x: Math.random() * (window.innerHeight/2),
              y: Math.random() * (window.innerHeight/2),
              width: canvasWidth/canvasWidthDivider,
              height: canvasHeight/canvasWidthDivider,
          }}
        >
          <canvas
            className="camera camera3Canvas"
            ref={this.camera3Canvas}
            width={canvasWidth}
            height={canvasHeight}
          />

        </Rnd>

      </div>
    );
  }
}

export default LiveStream;
