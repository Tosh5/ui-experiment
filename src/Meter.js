import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MeterProvider from './MeterProvider';


const Meter = (props) => {

  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return 'hsl(' + c + ', 100%, 50%)';
  };

  let gageProgress = 0

  if (props.index >= 0){
    gageProgress = props.index
  }else{
    gageProgress = 0
  }

  return (
    <div 
    style={{
      margin: '10px',
      padding: '20px'
    }}
    // style={{width: '30vw', height: '40vh', marginRight: '5vw', marginLeft: 'auto', alignItems: 'right', alignContent: 'right'}}
    >
      <MeterProvider valueStart={0} valueEnd={gageProgress}>
        {(value) => (
          <CircularProgressbar
            value= {value}
            text= {`${props.score}`}  //{`a${value}`}
            circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
            styles={{
              trail: {
                strokeLinecap: 'butt',
                transform: 'rotate(-126deg)',
                transformOrigin: 'center center',
              },
              path: {
                strokeLinecap: 'butt',
                transform: 'rotate(-126deg)',
                transformOrigin: 'center center',
                stroke: calcColor(value, 0, 120),
              },
              text: {
                fill: '#ddd',
                fontSize: '40px',
              }
            }
            }
            strokeWidth={10}
          />
        )}
      </MeterProvider>
    </div>
  );
};

export default Meter;