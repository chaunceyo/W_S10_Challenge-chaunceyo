import React from 'react'
import { useGetOrdersQuery } from '../state/orderApi'
import { useSelector, useDispatch } from 'react-redux'
import {selectFiltered} from '../state/filterSlice'

export default function OrderList() {
  const { data: orders} = useGetOrdersQuery()
  const dispatch = useDispatch()
  const currentSize = useSelector(st => st.filters.size)
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          currentSize === 'All'?
          orders?.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {order.customer} ordered a size {order.size} with 
                    {
                     order.toppings?
                     order.toppings.map((topping, idx) => {
                      if( idx === order.toppings.length - 1){
                        return ` ${idx + 1} ${idx + 1 > 1? 'toppings' : 'topping'}`
                      }
                    }
                    ): ' no toppings'
                    } 
                </div>
              </li>
            )
          }) : 
          orders?.map((order) => {
            if(order.size === currentSize)
            return (
              <li key={order.id}>
                <div>
                  {order.customer} ordered a size {order.size} with 
                    {
                     order.toppings?
                     order.toppings.map((topping, idx) => {
                      if( idx === order.toppings.length - 1){
                        return ` ${idx + 1} ${idx + 1 > 1? 'toppings' : 'topping'}`
                      }
                    }
                    ): ' no toppings'
                    } 
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === currentSize ? ' active' : ''}`
            return <button
              onClick={() => dispatch(selectFiltered(size))}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
