import React from 'react'
import Todo from './Todo'

const Main = () => {
  return (
    <section className="main">
    <input className="toggle-all" type="checkbox" />
    <label htmlFor="toggle-all">
        Mark all as complete
    </label>
<Todo/>
   
</section>
  )
}

export default Main