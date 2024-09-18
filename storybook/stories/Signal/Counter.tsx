import React from 'react';
import { createStore } from "autostore-react"
import PropTypes from 'prop-types';
 
const { state,$ } = createStore({    
  root:{
    count: 1
  }    
})



/** Primary UI component for user interaction */
export const Counter = () => {
  
  return (
    <div>
      <span>Count:{$('root.count')}</span>
      <button onClick={()=>state.root.count++}>+1</button>
    </div>
  );
};
 