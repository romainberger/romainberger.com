import React from "react"
import { Link } from "react-router-dom"

import config from "./../config"

const Header = () =>
    <div>
        <Link to={ config.routes.home }>Home</Link>
        <Link to={ config.routes.tabs }>Tabs</Link>
    </div>

export default Header
