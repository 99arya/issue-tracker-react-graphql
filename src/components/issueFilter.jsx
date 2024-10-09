import { Component } from 'react';

class IssueFilter extends Component {
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    render() {
        return (
            <div>
                Issue FIlter
            </div>
        )
    }
}

export default IssueFilter;