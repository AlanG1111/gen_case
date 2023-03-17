import React from "react";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Courses from "./pages/Courses/Courses";
import SingleCourse from "./pages/SingleCourse/SingleCourse";
import { UserRoutes } from "./helpers/routes";

import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <Container>
          <Routes>
            <Route path={UserRoutes.Courses} element={<Courses />} />
            <Route path={UserRoutes.Lesson} element={<SingleCourse />} />
            <Route
              path='*'
              element={<Navigate to={UserRoutes.Courses} replace />}
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
