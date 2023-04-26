import './App.css'
import React, {useState} from 'react'
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import { v4 as uuidv4 } from 'uuid';

const initialExpenses = [
  {id: uuidv4(), charge: "rent", amount:1600},
  {id: uuidv4(), charge: "car", amount:400},
  {id: uuidv4(), charge: "credit card bill", amount:1200}
]

const App = () => {
  //state values

  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses)
  //single expense
  const [charge,setCharge] = useState('')
  //single amount
  const [amount,setAmount] = useState('')
  //alert
  const [alert, setAlert] = useState({show:false})

 // functionality
  const handleCharge = e =>{
    setCharge(e.target.value)
  }

  const handleAmount = e =>{
    setAmount(e.target.value)
  }

  const handleAlert = ({type, text})=>{
    setAlert({show:true, type, text})
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }

  const handleSubmit = e =>{
    e.preventDefault()
    if(charge !== "" && amount > 0){
      const singleExpense = {
        id: uuidv4(),
        charge: charge,
        amount
      }
      setExpenses([...expenses, singleExpense])
      setAmount("")
      setCharge('')
      handleAlert({type:'success', text:"all items  added"})
    }else{
      handleAlert({type: 'danger', text:"charge can't be empty and amount value has to be bigger than zero"})
    }
  }

  const clearItems =()=>{
    setExpenses([]);
  }
  const handleDelete = (id)=>{
    let tempexpenses = expenses.filter(item=>item.id !== id)
    setExpenses(tempexpenses)
    handleAlert({type:"danger", text:"item deleted"})
  }
  const handleEdit = (id)=>{}


  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>
    <h1>budget calculator</h1>
    <main className='App'>
      <ExpenseForm 
        charge={charge} 
        amount={amount}
        handleAmount={handleAmount}
        handleCharge={handleCharge}
        handleSubmit={handleSubmit}/>
      <ExpenseList 
        expenses ={expenses} 
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        clearItems={clearItems}/> 
    </main>
    <h1>
      total spending :
       <span className='total'>
        ${expenses.reduce((acc, curr)=>{
          return (acc += parseInt(curr.amount))
      }, 0)}</span>
    </h1>
    </>
  )
}

export default App