import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';

import DietSegment from 'components/home/diet/Diet';

const DietSummary = props => {
  const { segments, component,onSegmentClick,toggle,...otherProps, } = props;

  const segmentItems = segments.map(segmentInfo => {
    const {
      component,
      textAlign,
      content,
      subheader,
      remaining
    } = segmentInfo;

    return (
      <DietSegment
        key={content}
        component={component}
        textAlign={textAlign}
        content={content}
        subheader={subheader}
        remaining={remaining}
        onClick={onSegmentClick}
        toggle={toggle}
      />
    );
  });

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={16}>
            <Header as="h4" attached="top" textAlign="center">
              <Header.Content>Your Daily Summary</Header.Content>
            </Header>
          <Segment.Group as={component} raised attached horizontal {...otherProps}>
            {segmentItems}
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    
  );
};

export default DietSummary;
