import * as React from 'react';
import Draggable from 'react-draggable';
import imageThing from '../Home/images/album_front.jpg';
import './App.css';

const numRows: number = 2;
const numColumns: number = 2;

const canvasWidth: number = 640;
const canvasHeight: number = 480;

class App extends React.Component {
  private video: any;
  private videoCanvases: any[];
  private videoBackgrounds: any[];
  private videoBackground: any;
  private sourceCanvas: any;

  public constructor(props:any) {
    super(props);
    this.videoBackgrounds = Array(numRows * numColumns).fill(0);
    this.videoCanvases = Array(numRows * numColumns).fill(0).map( () => React.createRef() );
    this.video = React.createRef();
    this.sourceCanvas = React.createRef();

    // Event Handler Binding
    this.setBackground = this.setBackground.bind(this);
  }

  public componentDidMount(): void {
    this.video.current.addEventListener('loadeddata', () => {
      // this.setBackground();
      // setTimeout(this.setBackground, 500);


      this.video.current.play();

      const video = this.video.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;




      const renderLoop = () => {
        const context = this.sourceCanvas.current.getContext('2d');

        context.drawImage(video, 0, 0, videoWidth, videoHeight);

        /*
        const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
        const canvasBackground = this.videoBackground;

        // Subtract the stored background
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
         */

        this.videoCanvases.forEach( (canvas, i: any) =>
          this.renderCanvas(canvas, i)
        );

        setTimeout(renderLoop, 1000/30);
      };

      renderLoop();



    });
  }

  public setBackground() {
    const video = this.video.current;

    //this.videoCanvases.forEach( (canvas, i: any) => {
    const context = this.sourceCanvas.current.getContext('2d');
      // CURRENTLY THE ISSUE WITH SUBTRACTION. CANVAS.CURRENT.WIDTH as opposed to videoWidth
    const imageData = context.getImageData(0, 0, this.sourceCanvas.current.width, this.sourceCanvas.current.height);
      //const imageData = context.getImageData(0, 0, video.videWidth, video.videoHeight);
    this.videoBackground = imageData;
    //});
  }

  public renderCanvas(canvas: any, i: any) {

    const source = this.sourceCanvas.current;
    const context = canvas.current.getContext('2d');
    const rowOffset = Math.floor(i/numRows) * (source.height/numRows);

    context.clearRect(0,0, canvas.current.width, canvas.current.height);
    context.drawImage(source, 0+((i%numColumns)*(source.width/numColumns)), rowOffset, (source.width/numColumns), (source.height/numRows), 0, 0, canvasWidth/numColumns, canvasHeight/numRows);

  }
  public render() {

    const canvases = this.videoCanvases.map( ( ref, i ) => {
      // TODO: Will fix these keys soon
      return <Draggable key={i*30}><canvas key={i} ref={ref} width={canvasWidth / numColumns} height={canvasHeight / numRows}/></Draggable>
    });

    return (
      <div className="App">
      <button onClick={this.setBackground}>take background</button>
        <video controls={ true } loop={true} ref={ this.video }>
          <source src="/video/test.webm" type="video/webm"/>
        </video>

      <canvas className="sourceCanvas" ref={this.sourceCanvas} width={canvasWidth} height={canvasHeight} />

      {
        canvases
      }
      </div>
    );
  }
}

export default App;
