import * as React from 'react';
import './App.css';

class App extends React.Component {
  private video: any;
  private videoCanvas: any;
  private canvasContext: any;

  public constructor(props:any) {
    super(props);
    this.videoCanvas = React.createRef();
    this.video = React.createRef();

  }
  public componentDidMount(): void {
    console.log(this.video, this.videoCanvas);
    const canvas: any = this.videoCanvas.current;

    this.canvasContext = canvas.getContext('2d');

    this.video.current.play();
    this.renderCanvas();
  }
  public renderCanvas() {
    console.log("hello");
    const loop = () => {
      this.canvasContext.drawImage(this.video.current, 0, 0);
      setTimeout( loop, 1000/30);
    };

    loop();

  }
  public render() {

    return (
      <div className="App">
        <video controls={ true } ref={ this.video }>
          <source src="/video/video.webm" type="video/webm"/>
        </video>

        <canvas ref={this.videoCanvas} width="300" height="300"/>
      </div>
    );
  }
}

export default App;
