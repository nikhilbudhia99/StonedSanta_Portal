import React, { Component } from "react";
//import logo from './logo.svg';
import "./../App.css";
import MyTable from "./MyTable.js";

class AppNew extends Component {
  render() {
    return (
      <div className="App">
        <MyTable />
      </div>
    );
  }
}

export default AppNew; //works withouut default but without default we'll have to write 'import app' using curly braces when we want to import
