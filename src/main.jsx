import { createRoot } from "react-dom/client"

import "./index.css"
import Mozaika from "./Mozaika.jsx"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider>
      <Mozaika />
    </Provider>
  </BrowserRouter>,
)
