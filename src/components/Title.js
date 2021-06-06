import React from 'react'

function Title(props) {
  return (
    <div className="list-title">
      {props.title}
      <div className="list-count">
        {props.count}
      </div>
    </div>
  )
}

export default Title