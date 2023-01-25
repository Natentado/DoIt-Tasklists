import { Switch, Route } from "react-router-dom"
import { Login } from "../pages/Login"

export const Routes = () => {
    return(
    <Switch>
        <Route path={"/"} component={Login} />
    </Switch>
    )
}