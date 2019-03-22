import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Header from "./Header"
import Home from "./Home"
import Tabs from "./Tabs"

const App = () =>
    <Router>
        <Header />
        <Route path="/" exact component={ Home } />
        <Route path="/tabs" exact component={ Tabs } />
    </Router>

export default App
