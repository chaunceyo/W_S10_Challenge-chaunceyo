import React, {useReducer} from 'react'
import { useCreateOrderMutation } from '../state/orderApi'


const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'
const CHANGE_SIZE = 'CHANGE_SIZE'
const CHANGE_TOPPING = 'CHANGE_TOPPING'

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case CHANGE_SIZE: {
      const { name, value } = action.payload
      return {...state, [name]: value}
    }
    case CHANGE_TOPPING: {
      const {name, checked} = action.payload
      console.log(name, checked)
      
      return {...state, [name]: checked}
    }


    case RESET_FORM: 
      return  {fullName: '', size: '', '1': false, '2': false, '3': false, '4': false, '5': false,}
      
    default:
      return state
  }
}
export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, {isLoading: creatingOrder, error : orderError}] = useCreateOrderMutation()
  const onInputChange = ({target: {name, value}}) => {
    dispatch({type: CHANGE_INPUT, payload: { name, value}})
  }
  const onSizeChange = ({target: {name, value}}) => {
    dispatch({type: CHANGE_SIZE, payload: {name, value}})
  }
  const onToppingChange = ({target: {name, checked}}) => {
    dispatch({type: CHANGE_TOPPING, payload: {name, checked}})
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM})
  }
  const onOrderSubmit = (evt) => {
    evt.preventDefault()
    const {fullName, size} = state
    const allToppings = [state['1'],state['2'],state['3'],state['4'],state['5'],]
    let toppings = []
    allToppings.map((topping, idx) => {
      if(topping){
        console.log(topping, idx)
        toppings.push(idx + 1)
      }
    })
    createOrder({fullName, size, toppings})
      .unwrap()
      .then(data => {
        console.log(data)
        resetForm()
      })
      .catch(err => {
        console.log(err.data.message)
      })
  }

  return (
    <form onSubmit={onOrderSubmit}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {orderError && <div className='failure'>{orderError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onInputChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onSizeChange} value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onToppingChange} checked={state['1']} />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onToppingChange} checked={state['2']}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onToppingChange} checked={state['3']}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onToppingChange} checked={state['4']}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onToppingChange} checked={state['5']}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
