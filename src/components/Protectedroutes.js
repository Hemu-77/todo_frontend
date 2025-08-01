import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log(token);
  
  if (!token) {
    return <Navigate to="/signup" replace />;
  }
  return children;
}
