import { Switch, Route, useRouteMatch} from "react-router-dom";
import { EnrollVoterForm } from 'components/vote-admin/EnrollVoterForm'
import { EnrolledVoterChecker } from 'components/vote-admin/EnrolledVoterChecker'


export const VotingAdminSwitch: React.FC = () => {
    // Nested switch for rendering admin components. Use useRouteMatch hook
    // to get the base path for further matching using the routes in this
    // switch
    const match = useRouteMatch();
    const basePath = match.path;
    return (
        <Switch>
            <Route path={`${basePath}/enroll`} exact>
                <EnrollVoterForm />
            </Route>
            <Route path={`${basePath}/enrollmentCheck`} exact>
                <EnrolledVoterChecker />
            </Route>
        </Switch>
    );
}
