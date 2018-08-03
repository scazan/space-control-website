import * as React from 'react';
import Draggable from 'react-draggable';
import './App.css';

const numRows = 2;
const numColumns = 2;

const canvasSize = 400;

class App extends React.Component {
  private video: any;
  private videoCanvases: any[];
  private videoBackgrounds: any[];

  public constructor(props:any) {
    super(props);
    this.videoBackgrounds = Array(numRows * numColumns).fill(0);
    this.videoCanvases = Array(numRows * numColumns).fill(0).map( () => React.createRef() );
    this.video = React.createRef();

    // Event Handler Binding
    this.setBackground = this.setBackground.bind(this);
  }

  public componentDidMount(): void {
    this.video.current.addEventListener('loadeddata', () => {
      this.setBackground();

      this.videoCanvases.forEach( (canvas, i: any) =>
        this.renderCanvas(canvas.current.getContext('2d'), i)
      );

      this.video.current.play();
    });
  }

  public setBackground() {
     const video = this.video.current;
    this.videoCanvases.forEach( (canvas, i: any) => {
      const context = canvas.current.getContext('2d');
      // CURRENTLY THE ISSUE WITH SUBTRACTION. CANVAS.CURRENT.WIDTH as opposed to videoWidth
      const imageData = context.getImageData(0, 0, canvas.current.width, canvas.current.height);
      //const imageData = context.getImageData(0, 0, video.videWidth, video.videoHeight);
      this.videoBackgrounds[i] = imageData;
    });
  }

  public renderCanvas(context: any, i: any) {
    const loop = () => {
      const video = this.video.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const rowOffset = Math.floor(i/numRows) * (videoHeight/numRows);

      // context.drawImage(video, 0+((i%numColumns)*(videoWidth/numColumns)), rowOffset, (videoWidth/numColumns), (videoHeight/numRows), 0 , 0, canvasSize, canvasSize);
      context.drawImage(video, 0+((i%numColumns)*(videoWidth/numColumns)), rowOffset, (videoWidth/numColumns), (videoHeight/numRows), 0, 0, canvasSize, canvasSize);

      const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
      const canvasBackground = this.videoBackgrounds[i];

      const imageDataLength = imageData.data.length / 4; // 4 = serial RGBA
      for( let k=0; k < imageDataLength; k++) {
        const r = imageData.data[k * 4 + 0];
        const g = imageData.data[k * 4 + 1];
        const b = imageData.data[k * 4 + 2];

        const backgroundR = canvasBackground.data[k * 4 + 0];
        const backgroundG = canvasBackground.data[k * 4 + 1];
        const backgroundB = canvasBackground.data[k * 4 + 2];

        const differenceThreshold = 50;
        if(
          Math.abs(backgroundR - r) <= differenceThreshold
          && Math.abs(backgroundG - g) <= differenceThreshold
          && Math.abs(backgroundB - b) <= differenceThreshold
        ) {
          imageData.data[k*4+3] = 0;
        }
      }

      context.putImageData(imageData, 0, 0);
      setTimeout(loop, 1000/30);
    };

    loop();

  }
  public render() {

    const canvases = this.videoCanvases.map( ref => {
      // TODO: Will fix these keys soon
      return <Draggable key="blah"><canvas key={ref} ref={ref} width={canvasSize} height={canvasSize}/></Draggable>
    });

    return (
      <div className="App">
      <button onClick={this.setBackground}>take background</button>
        <video controls={ true } ref={ this.video }>
          <source src="/video/test.webm" type="video/webm"/>
        </video>

      {canvases}

      </div>
    );
  }
}

export default App;
