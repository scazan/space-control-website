import * as React from 'react';
import { Link } from 'react-router-dom';
import { Rnd }  from 'react-rnd';
import jsmpeg from 'jsmpeg';

import 'normalize.css';
import './index.css';

const leftOffset = 100;
const canvasWidth: number = 1920;
const canvasHeight: number = 1080;

class CameraGrid extends React.Component {
  private sourceCanvas: any;
  private camera2Canvas: any;
  private camera3Canvas: any;
  private camera4Canvas: any;
  private camera5Canvas: any;

  constructor(props) {
    super(props);

    this.sourceCanvas = React.createRef();
    this.camera2Canvas = React.createRef();
  }

  public componentDidMount() {
    const cameraHost = '192.168.0.41';
    const client = new WebSocket(`ws://${cameraHost}:9999`);
    const client2 = new WebSocket(`ws://${cameraHost}:9998`);

    const player = new jsmpeg(client, {
      canvas: this.sourceCanvas.current,
    });

    player.volume = 0.8;
    const player2 = new jsmpeg(client2, {
      canvas: this.camera2Canvas.current,
    });
  }

  public render() {
    return (
      <div className="cameraGrid">
        <Rnd
          lockAspectRatio={true}
          default={{
            x: leftOffset,
              y: 0,
              width: canvasWidth/2.5,
              height: canvasHeight/2.5,
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
            x: leftOffset + (canvasWidth/2.5) + 50,
              y: 0,
              width: canvasWidth/2.5,
              height: canvasHeight/2.5,
          }}
        >
          <canvas
            className="camera camera2Canvas"
            ref={this.camera2Canvas}
            width={canvasWidth}
            height={canvasHeight}
          />

        </Rnd>

      </div>
    );
  }
}

export default CameraGrid;
