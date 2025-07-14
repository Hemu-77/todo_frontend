import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import TodoList from "./components/Todolist";
import ProtectedRoute from "./components/Protectedroutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
