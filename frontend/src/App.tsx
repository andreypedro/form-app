import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewFormPage from "./pages/ViewFormPage";
import CreateFormPage from "./pages/CreateFormPage";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
          <h1 className="font-bold">Form Builder</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  List forms
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:underline">
                  Create form
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form/:id" element={<ViewFormPage />} />
            <Route path="/create" element={<CreateFormPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
