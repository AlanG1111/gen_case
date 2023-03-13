import React from "react";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Courses from "./pages/Courses/Courses";
import Lesson from "./pages/Lesson/Lesson";
import Header from "./components/Header/Header";
import { UserRoutes } from "./helpers/routes";

import "./App.css";

function App() {
  return (
    <div className='App'>
      <Header />
      <Router>
        <Container>
          <Routes>
            <Route path={UserRoutes.Courses} element={<Courses />} />
            <Route path={UserRoutes.Lesson} element={<Lesson />} />
            <Route
              path='*'
              element={<Navigate to={UserRoutes.Courses} replace />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
