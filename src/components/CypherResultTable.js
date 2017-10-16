import React from 'react';
import {Table, Message} from 'semantic-ui-react';
const stringify = require ('string.ify').configure ({ pure: true, maxLength: 80 });

export default function ProjectStatusBar({error, result}) {

    const jsonCellStyle = {
      maxWidth: '480px',
      overflow: 'hidden',
      textOverflow: 'clip',
      whiteSpace: 'wrap',
      wordBreak: 'all',
      wordWrap: 'break-word'
    };

  let resultHeaderRow = (error) ? (
    <Table.Row error>
    <Table.HeaderCell >
      <Message negative>
        <Message.Header>Error:</Message.Header>
        <p>{error.toString()}</p>
      </Message>

    </Table.HeaderCell>
  </Table.Row>
  ) : (
    <Table.Row>
      <Table.HeaderCell>
        <p></p>
      </Table.HeaderCell>
      <Table.HeaderCell style={jsonCellStyle}>
        <pre>{
          stringify(result.summary)
        }</pre>
      </Table.HeaderCell>
    </Table.Row>
  );

  let resultBodyRows = (result.records) ? (
    result.records.map((record, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell>{i}</Table.Cell>
          <Table.Cell style={jsonCellStyle}>
            <pre>{
              stringify(record)
            }</pre>
          </Table.Cell>
        </Table.Row>
      )
    })
  ) : (
    <Table.Row key="empty">
    </Table.Row>
  );



  return <Table definition compact="very" size='small' >
      <Table.Header fullWidth>
          {resultHeaderRow}
      </Table.Header>

      <Table.Body>
        {resultBodyRows}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell />
        </Table.Row>
      </Table.Footer>
    </Table>

}
