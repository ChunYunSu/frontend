import React from 'react';

function Header(props){
  console.log(props);
  return(
    <header>
      <div className="topic"><span id="topicName">{ props.topic }</span><span>List</span></div>
      <div className="subTopic">{ props.subtopic }</div>
    </header>
  )
}

export default Header;