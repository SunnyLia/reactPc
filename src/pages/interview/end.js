import React, { useState, useEffect } from 'react';
import {getCategory} from '../../redux/action';
export default function End() {
  useEffect(() => {
    getCategory().then(res=>{
      console.log(1234,res);
    })
  }, []);
  console.log(1234);
  return <div>1234</div>

}

