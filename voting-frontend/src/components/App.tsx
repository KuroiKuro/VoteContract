import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { VotingFrontendSwitch } from 'routing/VotingFrontendSwitch'

const App: React.FC = () => {
    return (
        <Router>
            <VotingFrontendSwitch />
        </Router>
    );
}

export { App };
