import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"

import "./index.css"

import { store } from "./store.js"
import Mozaika from "./Mozaika.jsx"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Mozaika />
    </Provider>
  </BrowserRouter>,
)
