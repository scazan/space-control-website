import * as React from 'react';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import jsmpeg from 'jsmpeg';
import imageThing from '../Home/images/album_front.jpg';

import './index.css';

const numRows: number = 2;
const numColumns: number = 2;

const canvasWidth: number = 240;
const canvasHeight: number = 160;

      const newImage = new Image();
      newImage.src = imageThing;

class LiveStream extends React.Component {
  private video: any;
  private videoCanvases: any[];
  private videoBackgrounds: any[];
  private videoBackground: any;
  private sourceCanvas: any;

  constructor(props) {
    super(props);

    this.videoBackgrounds = Array(numRows * numColumns).fill(0);
    this.videoCanvases = Array(numRows * numColumns).fill(0).map( () => React.createRef() );
    this.video = React.createRef();
    this.sourceCanvas = React.createRef();
  }

  public componentDidMount() {
    const client = new WebSocket('ws://localhost:9999');
    const player = new jsmpeg(client, {
      canvas: this.sourceCanvas.current,
    });


    const renderLoop = () => {
      if(this.sourceCanvas.current) {
        this.videoCanvases.forEach( (canvas, i: any) =>
          this.renderCanvas(canvas, i)
        );
      }

      // setTimeout(renderLoop, 1000/30);
      setTimeout(renderLoop, 1000/10);
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
      // context.drawImage(newImage, 0+((i%numColumns)*(source.width/numColumns)), rowOffset, (source.width/numColumns), (source.height/numRows), 0, 0, canvasWidth/numColumns, canvasHeight/numRows);
    }
  }

  public render() {

    const canvases = this.videoCanvases.map( ( ref, i ) => {
      // TODO: Will fix these keys soon
      return (
        <Draggable key={i*30}>
          <canvas key={i} ref={ref} width={canvasWidth} height={canvasHeight}/>
        </Draggable>
      );
    });

    return (
      <div className="liveStream">

        <h2>Object Collection</h2>
        <h1>You Are Under Our Space Control</h1>

        <canvas ref={this.sourceCanvas} width={canvasWidth} height={canvasHeight}/>
        {canvases}
      </div>
    );
  }
}

export default LiveStream;
