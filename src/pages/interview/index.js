import React, { useState, useEffect } from 'react';
import {getCategory} from '../../redux/action';
export default function Interview() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getCategory().then(res=>{
      if(res) setList(res)
    })
  }, []);
  console.log(list);
  return <div>1234</div>

}

