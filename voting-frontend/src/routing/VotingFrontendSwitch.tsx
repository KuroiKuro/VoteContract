import {
    Switch,
    Route,
} from "react-router-dom";
import { EnrollVoterForm } from 'components/vote-admin/EnrollVoterForm'

export const VotingFrontendSwitch: React.FC = () => {
    return (
        <Switch>
            <Route path="enroll" exact>
                <EnrollVoterForm />
            </Route>
        </Switch>
    );
}
