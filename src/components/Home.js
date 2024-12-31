import React from 'react'
import Notes from './Notes'


const Home = (props) => {
const {showalert} = props;

  return (
    <div>
    
<div className="container my-3">
     <Notes showalert={showalert}/>
    </div>
    </div>
  )
}

export default Home
