import React from 'react';
import { Header, Modal } from 'semantic-ui-react';

const complexModal = ({ style, openModal, onClose, title, subtitle, children, content }) => {
  return (
    <Modal style={style} open={openModal} onClose={onClose} size="mini">
      <Header content={title} subheader={subtitle} />
      {content && <Modal.Content>{content}</Modal.Content>}
      <Modal.Actions>{children}</Modal.Actions>
    </Modal>
  );
};

export default complexModal;
