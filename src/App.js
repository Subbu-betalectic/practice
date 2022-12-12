import { ThemeProvider, theme } from "@reusejs/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Home";
import AddFavoritePackage from "./Components/AddFavoritePackage";
import newTheme from "./Components/variants";

function App() {
  return (
    <ThemeProvider value={newTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/addFavoritePackage"
            element={<AddFavoritePackage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
