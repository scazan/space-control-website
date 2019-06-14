import * as React from 'react';
import { Link } from 'react-router-dom';
import { Rnd }  from 'react-rnd';
import jsmpeg from 'jsmpeg';

import 'normalize.css';
import './index.css';

const numRows: number = 2;
const numColumns: number = 2;
const canvasWidth: number = 240;
const canvasHeight: number = 160;

class LiveStream extends React.Component {
  private videoCanvases: any[];
  private videoBackgrounds: any[];
  private videoBackground: any;
  private sourceCanvas: any;

  constructor(props) {
    super(props);

    this.videoBackgrounds = Array(numRows * numColumns).fill(0);
    this.videoCanvases = Array(numRows * numColumns).fill(0).map( () => React.createRef() );
    this.sourceCanvas = React.createRef();
  }

  public componentDidMount() {
    const client = new WebSocket('ws://localhost:9999');
    const player = new jsmpeg(client, {
      forceCanvas2D: true,
      canvas: this.sourceCanvas.current,
    });

    const renderLoop = () => {
      if(this.sourceCanvas.current) {
        this.videoCanvases.forEach( (canvas, i: any) =>
          this.renderCanvas(canvas, i)
        );
      }

      window.requestAnimationFrame(renderLoop);
    };

    renderLoop();

  }

  public renderCanvas(canvas: any, i: any) {
    if(canvas.current) {
      const source = this.sourceCanvas.current;

      const context = canvas.current.getContext('2d');
      const rowOffset = Math.floor(i/numRows) * (source.height/numRows);

      context.clearRect(0,0, canvas.current.width, canvas.current.height);
      context.drawImage(source, 0+((i%numColumns)*(source.width/numColumns)), rowOffset, (source.width/numColumns), (source.height/numRows), 0, 0, canvasWidth/numColumns, canvasHeight/numRows);
    }
  }

  public render() {
    const canvases = this.videoCanvases.map( ( ref, i ) => {
      // TODO: Will fix these keys soon
      return (
        <Rnd
          key={i*30}
          lockAspectRatio={true}
          default={{
            x: Math.random() * 500,
            y: Math.random() * 500,
              width: canvasWidth / numRows,
            height: canvasHeight / numColumns,
          }}
        >
          <canvas
            key={i}
            ref={ref}
            width={canvasWidth / numRows}
            height={canvasHeight / numColumns}
            className="cameraCanvas"
          />
        </Rnd>
      );
    });

    return (
      <div className="liveStream">

        <h1 className="showTitle">You Are Under Our Space Control</h1>

        <canvas
          className="sourceCanvas"
          ref={this.sourceCanvas}
          width={canvasWidth}
          height={canvasHeight}
        />

        {canvases}
        <Rnd>
          <section className="textAreaOne textArea">
            this is where I may see some of the word type of pieces being executed
          </section>
        </Rnd>
      </div>
    );
  }
}

export default LiveStream;
