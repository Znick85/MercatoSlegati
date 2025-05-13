import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SquadraUtente from "./components/squadra";
import Home from "./components/home";
import Admin from "./components/admin";
import { Totale } from "./components/totale";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/utente"
          element={
            <ProtectedRoute>
              <SquadraUtente />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/totale" element={<Totale />} />
      </Routes>
    </Router>
  );
}

export default App;
