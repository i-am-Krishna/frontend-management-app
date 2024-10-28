import React from 'react';

const Circle = ({color,height='8px',width='8px'}) => {
  
  const bg = {
    'low priority':'#63C05B',
    'moderate priority':'#18B0FF',
    'high priority':'#FF2473'
  } 

  const circleStyle = {
    height: height,
    width: width,
    backgroundColor: bg[color],
    borderRadius: '50%', // This makes it a circle
  };

  return <span style={circleStyle}></span>;
};

export default Circle;
