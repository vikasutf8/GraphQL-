import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { CREATE_TODO, GET_TODOS, TOGGLE_COMPLETE } from './queries/todoQery';
import type { TodoType } from './types';

const App = () => {

  const [todo, setTodo] = useState("");
  const [todos,setTodos] = useState<Array<TodoType>>([]);
const  {data,loading,error} = useQuery<TodoType>(GET_TODOS)
const [createTodo,{data:newTodo, error:newTodoError, loading:newTodoLoading }] = useMutation(CREATE_TODO);
const [toggleComplete,] = useMutation(TOGGLE_COMPLETE); 
useEffect(()=>{

  if(data?.todo)setTodos(data)


},[data])
//IMPORTANT ::always a delay between mutation and query
useEffect(()=>{
  if(newTodo)setTodos([newTodo?.createTodo,...todos])
},[newTodo])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({variables:{todo:todo}})
    if(newTodoError)alert(newTodoError.message)
      setTodo("")
  }

  const handleToggle = (id:number,data:boolean)=>{
    // toggleComplete({variables:{id:id,data:data}})
    const updatedTodo = todos.map((todo)=>{
      if(todo.id===id)return {...todo,completed:data}
      return todo
    })
    toggleComplete({variables:{id:id,data:data}})
    setTodos(updatedTodo)
  }
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-500 text-amber-50'>
      <div className='w-full px-2 md:w-[600px] md:px-0 rounded-md bg-gray-600 h-[60vh] flex flex-col gap-2'>
        <div className='flex w-full items-center justify-center text-4xl font-bold border-2 '>
          What is In your mind?
        </div>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
          <input type="text" name="todo" className='w-full px-4 py-2 border-2 rounded-md border-gray-600 focus:border-amber-500 '      placeholder="What is in your mind?"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          disabled={newTodoLoading} 
          />
        </form>

        <div className='h-[50vh] w-full flex flex-col gap-2 overflow-y-scroll'>
    {loading && <div>Loading...</div>}
    {error && <div className='text-red-300'>Error! {error.message}</div>}
    {/* play with data types */}
    {todos && todos.map((todo:TodoType) => (
      <div key={todo.id} className='flex flex-col gap-2 w-full'>
        <div className='flex items-center justify-between'>
          <div className={`text-xl font-bold ${todo.completed && "line-through"}`}>{todo.todo}</div>
          <div className='flex gap-2 items-center'>
            <input type="checkbox" className='w-5 h-5 border-2 rounded-md' checked={todo.completed} onChange={(e)=>handleToggle(todo.id,e.target.checked)} />
            <button className='px-2 py-1 bg-gray-600 text-amber-50 rounded-md'>Delete</button>
          </div>
        </div>
      </div>
    ))}
        </div>
      </div>

    </div>
  )
}

export default App