import React from 'react';
import {Segment, Label, Icon} from 'semantic-ui-react'

export default function ProjectStatusBar({project}) {

  var activeGraph = project ? project.graphs.find((graph) => {
    if (graph.status === "ACTIVE") {
      return true;
    } else {
      return false;
    }
  }) : null;

  return <Segment>
    <Label>
      <Icon name='folder outline'/>
      Project
      <Label.Detail>{project
          ? project.name
          : "No Project"}</Label.Detail>
    </Label>
    <Label>
      <Icon name='database'/>
      Graph
      <Label.Detail>{activeGraph
          ? activeGraph.name
          : "No Graph"}</Label.Detail>
    </Label>
    <Label>
      <Icon name='lightning'/>
      Connection
      <Label.Detail>{activeGraph
          ? 'bolt://' + activeGraph.connection.configuration.protocols.bolt.host + ':' + activeGraph.connection.configuration.protocols.bolt.port
          : "--"}</Label.Detail>
    </Label>

  </Segment>

}
