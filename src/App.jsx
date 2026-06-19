import './App.css'
import { useState, useEffect } from 'react'
import { ShowTodo } from './components/ShowTodo'
import { AddInput } from './components/AddInput'

function App() {
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState({
    title: '',
    status: 'waiting'
  });

  const handleInputChange = (e) => {
    setTodo({ ...todo, title: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = [...todos, todo]
    if (newTodos.length > 40) {
      alert('Delete any done todo')
      setTodo({...todo, title: ''})
      return
    }
    if (todo.title === '') {
      setTodo({...todo, title: ''})
      return
    } 
    setTodos(newTodos)
    setTodo({...todo, title: ''})
  }

  const handleDelete = (index) => {
    const newTodos = todos.filter((todo) => todo !== todos[index])
    setTodos(newTodos)
  } 

  const handleUpdate = (index) => {
    const newTodos = [...todos]
    if (newTodos[index].status === 'waiting') newTodos[index].status = 'in process'
    else if (newTodos[index].status === 'in process') newTodos[index].status = 'done'
    else newTodos[index].status = 'waiting'
    setTodos(newTodos)
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);  

  return (
    <>
      <AddInput todo={todo} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
      <ShowTodo todos={todos} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
    </>
  )
}

export default App
