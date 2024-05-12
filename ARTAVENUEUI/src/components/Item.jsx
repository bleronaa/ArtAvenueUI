import React from 'react'
import "./item.css"

const Item = (props) => {
  return (
    <div className='item'>
      <img src={props.image} alt=""/>
      <p>{props.name}</p>
      <div className='item-bids'>
        <div className="item-estimate">
      <p>{props.estimate}</p>
      </div>
      <div className="item-bids-now">
      <p>{props.bids}</p>
      </div>
      </div>
    </div>
  )
}

export default Item
