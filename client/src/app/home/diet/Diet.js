import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';

const DietSegment = ({
  textAlign = 'center',
  content,
  subheader,
  remaining
}) => (
  <Segment>
    <Header
      size="small"
      textAlign={textAlign}
      content={content}
      subheader={
        <Label circular size="tiny" color="green">
          {subheader}
        </Label>
      }
    />
  </Segment>
);

export default DietSegment;
