import React, { Component } from 'react';
import PresentationsList from './components/Presentations-list.component';
import AddPresentation from './components/Add-presentation-component';
import Presentation from './components/Presentation.component'
import InputFile from './InputFile'
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes, Link } from "react-router-dom"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => err);
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <div className="container">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/presentee"} className="navbar-brand">
              Presentee
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/presentations"} className="nav-link">
                  Presentations
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
          <Routes>
            <Route path="/presentations" element={<PresentationsList />} />
            <Route path="/add" element={<AddPresentation /> } />
            <Route path="/presentations/:id" element={<Presentation />} />
          </Routes>
          <InputFile />
          <p>{this.state.apiResponse}</p>
        </div>
      </div>
    );
  }
}

export default App