import { useEffect, useState } from "react";
import API from "../api/axios";
import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null); 

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    taskTime: "",
    reminderTime: ""
  });

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await API.get("api/todo");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  // Add or Update todo
  const submitTodo = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`api/todo/${editId}`, form);
      } else {
        await API.post("api/todo", form);
      }

      setForm({ title: "", description: "", date: "", taskTime: "", reminderTime: "" });
      setEditId(null);
      fetchTodos();
    } catch (err) {
      console.error("Error submitting todo:", err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await API.delete(`api/todo/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Load todo into form for editing
  const editTodo = (todo) => {
    setForm({
      title: todo.title,
      description: todo.description,
      date: todo.date,
      taskTime: todo.taskTime,
      reminderTime: todo.reminderTime
    });
    setEditId(todo._id);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <form onSubmit={submitTodo} className="todo-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <label htmlFor="taskTime">Task Time</label>
        <input
          type="time"
          id="taskTime"
          value={form.taskTime}
          onChange={(e) => setForm({ ...form, taskTime: e.target.value })}
        />

        <label htmlFor="reminderTime">Reminder Time</label>
        <input
          type="time"
          id="reminderTime"
          value={form.reminderTime}
          onChange={(e) => setForm({ ...form, reminderTime: e.target.value })}
        />

        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id}>
            <div className="todo-header">
              <p className="todo-title">{todo.title}</p>
              <span className="task-time">{todo.taskTime}</span>
            </div>
            <p>{todo.description}</p>
            <button className="edit-btn" onClick={() => editTodo(todo)}>Edit</button>
            <button className='delete-btn' onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
