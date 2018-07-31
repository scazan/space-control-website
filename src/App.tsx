import * as React from 'react';
import './App.css';

class App extends React.Component {
  private video: any;
  private videoCanvas: any[];

  public constructor(props:any) {
    super(props);
    this.videoCanvas = Array(20).fill(0).map( () => React.createRef() );
    this.video = React.createRef();
  }

  public componentDidMount(): void {
    this.videoCanvas.forEach( ( canvas, i: any) =>
      this.renderCanvas(canvas.current.getContext('2d'), i)
    );

    this.video.current.play();
  }

  public renderCanvas(context: any, i: any) {
    const loop = () => {
      const video = this.video.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const rowOffset = Math.floor(i/4) * (videoHeight/4);

      context.drawImage(video, 0+((i%4)*(videoWidth/4)), rowOffset, (videoWidth/4), (videoHeight/4), 0 , 0, 100, 100);
      setTimeout( loop, 1000/30);
    };

    loop();

  }
  public render() {

    const canvases = this.videoCanvas.map( ref => {
      return <canvas key={ref} ref={ref} width="100" height="100"/>
    });

    return (
      <div className="App">
        <video controls={ true } ref={ this.video }>
          <source src="/video/video.webm" type="video/webm"/>
        </video>

      {canvases}

      </div>
    );
  }
}

export default App;
