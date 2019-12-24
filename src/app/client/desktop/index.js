import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Template from './Template'
import routes from './routes'

const Desktop = () => {
    return <Switch>
        <Template>
            {routes.map(route => <Route {...route} />)}
        </Template>
    </Switch>
}

export default Desktop