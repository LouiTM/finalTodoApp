export const ShowTodo = (props) => {
    const { todos, handleUpdate, handleDelete } = props

    const getStatusClass = (status) => {
      if (status === 'waiting') return 'todo-item1'
      if (status === 'in process') return 'todo-item2'
      if (status === 'done') return 'todo-item3'
      return ''
    }

    return (
        <div className='todo-container'>
          <ul>
            {todos.map((todo, index) => {
              return (
                <li className={getStatusClass(todo.status)} key={index}>
                  <h3>{index+1}</h3>
                  <p>{todo.title}</p>
                  <p>{todo.status}</p>
                  <button onClick={() => handleUpdate(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              )
            })}
          </ul>
        </div>
    )
}