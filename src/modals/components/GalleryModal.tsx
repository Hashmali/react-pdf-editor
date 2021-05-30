import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import symbols from '../../utils/symbols';
import jiraiya from './jiraiya.png';
import naruto from './naruto.png';
import kakashi from './kakashi.png';
import levi from './levi.png';

interface Props {
  open: boolean;
  dismiss: () => void;

  confirm: (drawing?: { url: string; symbolName: string }) => void;
  drawing?: DrawingAttachment;
}

export const GalleryModal = ({ open, dismiss, confirm, drawing }: Props) => {
  const handleDone = (source: string, name: string) => {
    confirm({
      url: source,
      symbolName: name,
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
          {symbols.map((symbol, index) => {
            return (
              <img
                alt="description"
                className="ui image"
                src={symbol.icon}
                onClick={() => handleDone(symbol.icon, symbol.name)}
              />
            );
          })}
        </div>

        <div className="ui tiny images">
          <img
            alt="description"
            className="ui image"
            src={naruto}
            onClick={() => handleDone(naruto, 'naruto')}
          />
          <img
            alt="description"
            className="ui image"
            src={jiraiya}
            onClick={() => handleDone(jiraiya, 'jiraiya')}
          />
          <img
            alt="description"
            className="ui image"
            src={kakashi}
            onClick={() => handleDone(kakashi, 'kakashi')}
          />
          <img
            alt="description"
            className="ui image"
            src={levi}
            onClick={() => handleDone(levi, 'levi')}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" content="Cancel" onClick={closeModal} />
      </Modal.Actions>
    </Modal>
  );
};
