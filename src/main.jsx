import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
// import { Provider } from "react-redux"

import "./index.css"
import Mozaika from "./Mozaika.jsx"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <Provider> */}
      <Mozaika />
    {/* </Provider> */}
  </BrowserRouter>,
)
