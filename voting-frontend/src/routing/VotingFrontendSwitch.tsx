import { Switch, Route } from "react-router-dom";
import { VotingAdminSwitch } from 'routing/VotingAdminSwitch'
import { VoteCandidateForm } from 'components/voters/VoteCandidateForm'

export const VotingFrontendSwitch: React.FC = () => {
    return (
        <Switch>
            <Route path="/admin">
                <VotingAdminSwitch />
            </Route>
            <Route path="/vote" exact>
                <VoteCandidateForm />
            </Route>
        </Switch>
    );
}
