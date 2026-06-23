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

  const [title, setTitle] = useState("")

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()

    if (!trimmed) return

    const existingIndex = todos.findIndex(todo => todo.title === trimmed)
    if (existingIndex !== -1) {
      if (todos[existingIndex].status === 'done') {
        setTodos([...todos.filter((_, i) => i !== existingIndex), { title: trimmed, status: 'waiting' }])
      } else {
        alert('finish the existing one')
      }
      setTitle('')
      return
    }
    
    if (todos.length >= 40) {
      alert('max todos')
      setTitle('')
      return
    }

    

    setTodos([...todos, { title: trimmed, status: 'waiting' }])
    setTitle('')
  }

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  } 

  const handleUpdate = (index) => {
    const nextStatus = { waiting: 'in process', 'in process': 'done', done: 'waiting' }
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, status: nextStatus[todo.status] } : todo
    ))
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);  

  return (
    <>
      <AddInput title={title} handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
      <ShowTodo todos={todos} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
    </>
  )
}

export default App
