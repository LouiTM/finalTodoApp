import './App.css'
import { useState, useEffect } from 'react'
import { ShowTodo } from './components/ShowTodo'
import { AddInput } from './components/AddInput'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        return parsed.map(todo =>
          todo.status === 'in process' ? { ...todo, status: 'waiting' } : todo
        );
      } catch {
        return [];
      }
    } else {
      return [];
    }
  });

  const [title, setTitle] = useState("")
  const [toast, setToast] = useState(null)


  const showToast = (message, type = 'error') => {
    setToast({ message, type })
  }

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()

    if (!trimmed) return

    const existingIndex = todos.findIndex(todo => todo.title === trimmed && !todo.deleting)
    if (existingIndex !== -1) {
      if (todos[existingIndex].status === 'done') {
        setTodos([...todos.filter((_, i) => i !== existingIndex), { title: trimmed, status: 'waiting' }])
        showToast('完了済みのタスクを未完了として再登録しました。', 'success')
      } else {
        showToast('同じ名前の未完了タスクが既にリストに存在します。')
      }
      setTitle('')
      return
    }

    if (todos.length >= 5) {
      showToast('タスクは最大5件まで登録可能です。')
      setTitle('')
      return
    }

    setTodos([...todos, { title: trimmed, status: 'waiting' }])
    setTitle('')
  }

  const handleDelete = (index) => {
    if (todos[index].status === 'waiting') {
      showToast('未完了のタスクは削除できません。')
      return
    }

    const targetTitle = todos[index].title

    setTodos(prev => prev.map(todo =>
      todo.title === targetTitle ? { ...todo, deleting: true } : todo
    ))

    setTimeout(() => {
      setTodos(prev => prev.filter(todo => todo.title !== targetTitle))
      showToast('タスクを削除しました。', 'success')
    }, 300)
  }

  const handleUpdate = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, status: todo.status === 'done' ? 'waiting' : 'done' } : todo
    ))
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return (
    <div className="app-container">
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            <span>{toast.message}</span>
            <button className="toast-close" onClick={() => setToast(null)}>
              &times;
            </button>
          </div>
        </div>
      )}
      <AddInput title={title} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
      <ShowTodo todos={todos} handleUpdate={handleUpdate} handleDelete={handleDelete} />
    </div>
  )
}

export default App
