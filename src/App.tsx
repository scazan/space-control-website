import * as React from 'react';
import './App.css';

class App extends React.Component {
  private video: any;
  private videoCanvas: any[];

  public constructor(props:any) {
    super(props);
    this.videoCanvas = Array(3).fill(0).map( () => React.createRef() );
    this.video = React.createRef();
  }

  public componentDidMount(): void {
    console.log(this.video, this.videoCanvas);

    this.videoCanvas.forEach( canvas =>
      this.renderCanvas(canvas.current.getContext('2d'))
    );

    this.video.current.play();
  }

  public renderCanvas(context: any) {
    const loop = () => {
      context.drawImage(this.video.current, 0, 0);
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

        <canvas ref={this.videoCanvas[0]} width="300" height="300"/>
        <canvas ref={this.videoCanvas[1]} width="300" height="300"/>
        <canvas ref={this.videoCanvas[2]} width="300" height="300"/>
      </div>
    );
  }
}

export default App;
