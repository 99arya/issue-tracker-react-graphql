import { Component } from 'react';
import IssueRow from './IssueRow';

class IssueTable extends Component {
    render() {
        const issuesData = this.props.issues.map(issue => {
            return (
               <IssueRow key={issue.id} issue={issue}/>
            );
        });

        return (
            <div>
                <table className='bordered-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Created</th>
                            <th>Effort</th>
                            <th>Completion Date</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuesData}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default IssueTable;