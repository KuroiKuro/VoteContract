import { Switch, Route } from "react-router-dom";
import { VotingAdminSwitch } from 'routing/VotingAdminSwitch'

export const VotingFrontendSwitch: React.FC = () => {
    return (
        <Switch>
            <Route path="/admin">
                <VotingAdminSwitch />
            </Route>
        </Switch>
    );
}
