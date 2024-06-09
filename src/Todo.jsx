import { useState } from "react";
import './Todo.css';
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
    let [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");
    let [editId, setEditId] = useState(null);
    let [editedTask, setEditedTask] = useState("");
    let [error, setError] = useState("");

    const getFormattedDate = () => {
        const date = new Date();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dayName = dayNames[date.getDay()];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];

        return `${dayName}, ${day} ${month}`;
    };

    let handleClick = () => {
        if (newTodo.trim() !== "") {
            setTodos([
                ...todos,
                { task: newTodo, id: uuidv4(), isDone: false }
            ]);
            setNewTodo("");
            setError("");
        } else {
            setError("Input field can't be empty");
        }
    };

    let updateTodo = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodos = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    let markAsDone = (id) => {
        setTodos(todos.map((todo) => {
            return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
        }));
    };

    let edit = (id, task) => {
        setEditId(id);
        setEditedTask(task);
    };

    let confirmEdit = (id) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    task: editedTask,
                };
            }
            return todo;
        }));
        setEditId(null);
    };

    return (
        <div className="container1">
            <h2>My Day</h2>
            <p>{getFormattedDate()}</p>
            <div className="container2">
                <input
                    type="text"
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={updateTodo}
                    required
                />
                <button onClick={handleClick}><i className="fa-solid fa-plus"></i></button>
            </div>
            {error && <div className="error-msg">{error}</div>}
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li className="todo-item" key={todo.id}>
                        {editId === todo.id ? (
                            <div className="container2" style={{ marginBottom: 0 }}>
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                />
                                <button onClick={() => confirmEdit(todo.id)}><i className="fa-solid fa-check"></i></button>
                            </div>
                        ) : (
                            <div className="todo">
                                <div className={todo.isDone ? "task-done" : ""}>{todo.task}</div>
                                <div>
                                    <button onClick={() => markAsDone(todo.id)}><i className={`fa-regular ${todo.isDone ? 'fa-circle-check' : 'fa-circle'}`}></i></button>
                                    <button onClick={() => edit(todo.id, todo.task)}><i className="fa-solid fa-pen"></i></button>
                                    <button onClick={() => deleteTodos(todo.id)}><i className="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
