import React from "react"
import { render } from "react-dom"

import Header from "./components/Header"

const App = () =>
<div>
    <Header />
</div>

render(<App />, document.querySelector("#app"))
