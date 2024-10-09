import { Component } from "react";
import IssueFilter from "./issueFilter";
import IssueTable from "./issueTable";
import IssueAdd from "./issueAdd";

class IssueList extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      isTrue: false,
    };
    console.log("constructor");
  }

  createIssue = (issue) => {
    fetch("/createIssue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            data.created = new Date(data.created);
            if (data.completionDate) {
              data.completionDate = new Date(data.completionDate);
            }
            const newIssueArray = [...this.state.issues, data];
            this.setState({
              issues: newIssueArray,
            });
          });
        } else {
          res.json().catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    console.log("componentDidMount");

    const graphQuery = {
      query: `
        query IssueList {
          issueList {
            completionDate
            created
            effort
            id
            owner
            status
            title
          }
    }
    `,
    };

    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphQuery),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            data.created = new Date(data.created);
            if (data.completionDate) {
              data.completionDate = new Date(data.completionDate);
            }
            const newIssueArray = [...this.state.issues, data];
            this.setState({
              issues: newIssueArray,
            });
          });
        } else {
          res.json().catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));

    // fetch("/getIssues")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     data.records.forEach((issue) => {
    //       issue.created = new Date(issue.created);
    //       if (issue.completionDate) {
    //         issue.completionDate = new Date(issue.completionDate);
    //       }
    //     });
    //     this.setState({
    //       issues: data.records,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log("shouldComponentUpdate nextState", nextState.isTrue);
    // if (nextState.isTrue == this.state.isTrue) {
    //     return false;
    // }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    console.log("componentDidUpdate prevState: ", prevState.isTrue);
    console.log("componentDidUpdate currentState: ", this.state.isTrue);
  }

  render() {
    console.log("render");
    return (
      <div>
        <h1>Issue Tracker | {this.state.isTrue.toString()}</h1>
        <br />
        <IssueFilter />
        <br />
        <IssueTable issues={this.state.issues} />
        <br />
        <IssueAdd createIssue={this.createIssue} />
        <br />
        <button
          onClick={() => {
            this.setState({
              isTrue: true,
            });
          }}>
          It's True
        </button>
      </div>
    );
  }
}

export default IssueList;
