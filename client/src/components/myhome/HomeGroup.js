import React from 'react';
import { Segment } from 'semantic-ui-react';

import SegmentHome from 'components/myhome/Home';

const SegmentHomeGroup = props => {
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
      <SegmentHome
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
    <div>
      <Segment.Group as={component} raised attached horizontal {...otherProps}>
        {segmentItems}
      </Segment.Group>
    </div>
  );
};

export default SegmentHomeGroup;
