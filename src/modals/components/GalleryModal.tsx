import React, { useState, createRef, useEffect } from 'react';
import { Modal, Button, Menu, Dropdown, Label } from 'semantic-ui-react';
import { Color } from '../../entities';
import jiraiya from './jiraiya.png';
import naruto from './naruto.png';
import kakashi from './kakashi.png';
import levi from './levi.png';
import src from '*.bmp';

interface Props {
  open: boolean;
  dismiss: () => void;

  confirm: (drawing?: { url: string }) => void;
  drawing?: DrawingAttachment;
}

export const GalleryModal = ({ open, dismiss, confirm, drawing }: Props) => {
  const handleDone = (source: string) => {
    confirm({
      url: source,
    });

    closeModal();
  };

  const closeModal = () => {
    dismiss();
  };

  return (
    <Modal size="small" dimmer="inverted" open={open} onClose={closeModal}>
      <Modal.Header>Choose an image</Modal.Header>

      <Modal.Content>
        <div className="ui tiny images">
          <img
            className="ui image"
            src={naruto}
            onClick={() => handleDone(naruto)}
          />
          <img
            className="ui image"
            src={jiraiya}
            onClick={() => handleDone(jiraiya)}
          />
          <img
            className="ui image"
            src={kakashi}
            onClick={() => handleDone(kakashi)}
          />
          <img
            className="ui image"
            src={levi}
            onClick={() => handleDone(levi)}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" content="Cancel" onClick={closeModal} />
      </Modal.Actions>
    </Modal>
  );
};
