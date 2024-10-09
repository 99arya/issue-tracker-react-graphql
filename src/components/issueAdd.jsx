import { Component } from 'react';

class IssueAdd extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = document.forms.issueAddForm;
        const owner = formData.owner.value;
        const title = formData.title.value;
        this.props.createIssue({
            owner: owner,
            title: title
        });
    }

    render() {
        return (
            <div>
                <form name='issueAddForm' onSubmit={this.handleSubmit}>
                    <input type="text" name='title' placeholder='title'/>
                    <input type="text" name='owner' placeholder='owner'/>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

export default IssueAdd;