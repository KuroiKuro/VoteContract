import {
    Switch,
    Route,
} from "react-router-dom";
import { EnrollVoterForm } from 'components/vote-admin/EnrollVoterForm'
import { EnrolledVoterChecker } from 'components/vote-admin/EnrolledVoterChecker'

export const VotingFrontendSwitch: React.FC = () => {
    return (
        <Switch>
            <Route path="/enroll" exact>
                <EnrollVoterForm />
            </Route>
            <Route path="/enrollmentCheck" exact>
                <EnrolledVoterChecker />
            </Route>
        </Switch>
    );
}
