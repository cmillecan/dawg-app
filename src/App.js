import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import ListAllBreeds from "./Components/ListAllBreeds";
import Breed from "./Components/Breed";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <ListAllBreeds />
          </Route>
          <Route path="/breed/:breedName" component={Breed} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
