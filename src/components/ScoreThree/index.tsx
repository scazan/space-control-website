import * as React from 'react';
import './index.css';

interface IState {
  currentWordIndex: number,
    playing: boolean,
}

declare global {
  interface Array<T> {
    shuffle(): Array<T>;
  }
}

Array.prototype.shuffle = function(){
  var counter = this.length, temp, index;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    index = (Math.random() * counter--) | 0;

    // And swap the last element with it
    temp = this[counter];
    this[counter] = this[index];
    this[index] = temp;
  }

  return this;
};

interface Word {
  word: string,
  originalIndex: number,
}

const originalPassage: Word[] = ('Yes. I would develop a space program that would have legality from the interplanetary council of other planets. Then we would have a right to go up there. You can’t be going in other people’s territory without permission. I’d give everyone on the planet an interplanetary passport with the right to go into outer space. I wouldn’t let a single astronaut go up there without an interplanetary passport. You have to have a passport to go to Europe, but they go up to the moon without a moon passport. The way they’re doing it, they are illegally trespassing on other areas and spheres of the universe.')
  .split(' ')
  .map((word: string, i: number) => ({word, originalIndex: i}))
  .shuffle();

class ScoreThree extends React.Component<{}, IState> {
  public constructor(props: object) {
    super(props);

    this.state = {
      currentWordIndex: 0,
      playing: false,
    };

    this.startPlaying = this.startPlaying.bind(this);
  }

  startPlaying() {
    this.setState({
      playing: true,
    });

    const playNext = () => setTimeout(() => {
      console.log('next');
      this.setState({
        currentWordIndex: this.state.currentWordIndex+1,
      });

      if (this.state.currentWordIndex < originalPassage.length-1) {
        playNext();
      }
    }, 500);

    playNext();
  }

  public render() {
    const activeClass = this.state.playing && 'active';

    return (
      <div className="scoreThree">
        <button className={`play ${activeClass}`} onClick={this.startPlaying}>
          THREE
        </button>
        <div className={`text ${activeClass}`}>
          { originalPassage
            .slice(0, this.state.currentWordIndex+1)
            .sort((a: Word,b: Word) => a.originalIndex - b.originalIndex)
            .map( word => `${word.word} `)
          }
        </div>
      </div>
    );
  }
}

export default ScoreThree;
