import Router from "./pages";
import { BrowserRouter } from "react-router-dom";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;