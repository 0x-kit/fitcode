import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';

const DietSegment = ({
  textAlign = 'center',
  content,
  subheader,
  onClick,
  remaining,
  toggle = 'false'
}) => (
  <Segment>
    <Header
      size="tiny"
      textAlign={textAlign}
      content={content}
      subheader={
        <Label circular size="mini" color={toggle ? 'green' : 'red'}>
          {toggle ? subheader : remaining}
        </Label>
      }
      onClick={() => onClick(!toggle)}
    />
  </Segment>
);

export default DietSegment;
