import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Logon from './components/Logon'
import Register from './components/Register'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes