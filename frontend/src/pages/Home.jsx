import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';
import { useTodoContext } from '../context/TodoContext';

const Home = () => {
    const { todo, input, setInput, addTodo} = useTodoContext();

    return (
        <>
            <div className='py-3 bg-[#F6F740] w-188 mx-auto mt-5 rounded-xl border-2 border-amber-800'>
                <Header />
                <div className='text-center my-8'>
                    <input className='p-2 text-lg bg-gray-100 w-70 rounded-md border-2 border-gray-500' type="text" value={input} placeholder='Enter task...'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={(e) => { if (e.key === "Enter") addTodo() }} />
                    <button className='p-2 ms-2 text-lg text-white font-bold bg-green-500 rounded-md border-2 border-green-700 cursor-pointer hover:bg-green-600 transition' onClick={addTodo}>Add</button>
                </div>
                <TodoList todo={todo} />
            </div>
            <Footer />
        </>
    )
}

export default Home