export const AddInput = (props) => {
    const { todo, handleSubmit, handleInputChange} = props
    return (
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <h1 className='main-title'>Add your todos to make a list</h1>
            <input type="text" placeholder='Add your todo here' value={todo.title} onChange={handleInputChange}/>
            <button type='submit'>Add</button>
          </form>
        </div>
    )
}