export const AddInput = (props) => {
  const { title, handleSubmit, handleInputChange } = props
  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h1 className='main-title'>Todo List</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder='新しいタスクを入力...'
            value={title}
            onChange={handleInputChange}
          />
          <button type='submit' className="add-btn">追加</button>
        </div>
      </form>
    </div>
  )
}