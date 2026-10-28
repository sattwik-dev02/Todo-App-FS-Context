import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todo, setTodo] = useState([]);
    const [input, setInput] = useState("");

    async function getAll() {
        try {
            const api = await axios.get("http://localhost:8001/todo/getAll");
            setTodo(api.data.data);
        } catch (error) {
            console.log("Todos can't be fetched: ", error.message);
            toast.error("Error occured while fetching saved Todos");
        }
    }

    async function addTodo() {
        if (input.trim().length < 3) {
            toast.error("Todo must be at least 3 characters");
            return;
        }
        const data = {
            "title": input
        }
        try {
            const api = await axios.post("http://localhost:8001/todo/create", data);
            // console.log(api.data);
            toast.success(api.data.message);
        } catch (error) {
            console.log("Todo not added: ", error.message);
            toast.error("Todo not added");
        }
        finally {
            setInput("");
            getAll();
        }
    }

    async function deleteTodo(id) {
        try {
            const api = await axios.delete(`http://localhost:8001/todo/delete/${id}`);
            toast.success(api.data.message);
            getAll();
        } catch (error) {
            console.log("Todo not deleted: ", error.message);
            toast.error("Todo not deleted");
        }
    }

    async function editTodo(id, data) {
        try {
            const api = await axios.put(`http://localhost:8001/todo/update/${id}`, data);
            toast.success(api.data.message);
            getAll();
        } catch (error) {
            console.log("Todo not updated: ", error.message);
            toast.error("Todo not updated");
        }
    }

    async function toggleCheck(id) {
        try {
            const response = await axios.patch(`http://localhost:8001/todo/check/${id}`);
            toast.success(response.data.message);
            getAll();
        } catch (error) {
            console.log("Error updating todo:", error.message);
            toast.error("Failed to update todo");
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    return (
        <TodoContext.Provider value={{ todo, input, setInput, addTodo, deleteTodo, editTodo, toggleCheck }}>
            {children}
        </TodoContext.Provider>
    )
}

// custom hook
export const useTodoContext = () => useContext(TodoContext);