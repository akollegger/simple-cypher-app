import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Container, Form, Button} from 'semantic-ui-react';
import {v1 as neo4j} from 'neo4j-driver/lib/browser/neo4j-web.min.js';

import ProjectStatusBar from './ProjectStatusBar.js';
import CypherResultTable from './CypherResultTable.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cypher: 'MATCH (n) RETURN n LIMIT 10',
      summary: {},
      error: false,
      result: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  extractActiveProjectFromProps(props) {
    const activeProject = props.context.activeProject;
    const activeGraph = activeProject ? activeProject.activeGraph : null;

    const boltUrl = activeGraph
        ? 'bolt://' + activeGraph.connection.configuration.protocols.bolt.host + ':' + activeGraph.connection.configuration.protocols.bolt.port
        : null;

    return { project: activeProject, graph: activeGraph, boltUrl };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleCypherResult = (result) => {
    this.setState({result: result})
  }

  handleCypherError = (error) => {
    this.setState({error: error, result:{}});
  }

  query = () => {
    var {boltUrl} = this.extractActiveProjectFromProps(this.props);

    if (boltUrl) {
        const cypher = this.state.cypher;

        const driver = neo4j.driver(boltUrl);

        const session = driver.session();
        const result = session.run(cypher);
        result.then(this.handleCypherResult, this.handleCypherError);
    }
}

  render() {

    return (
      <Container>
        <ProjectStatusBar project={this.props.context.activeProject}/>
        <Form>
          <Form.TextArea name='cypher' width="12" placeholder="MATCH (n) RETURN n LIMIT 10" onChange={this.handleInputChange}/>
          <Button onClick={() => this.query()}>Query</Button>
        </Form>

        <CypherResultTable error={this.state.error} result={this.state.result} />

      </Container>
    );
  }
}

export default connect(state => state)(App);
