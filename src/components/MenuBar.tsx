import React from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

interface Props {
  openHelp: () => void;
  uploadNewPdf: () => void;
  addText: () => void;
  addImage: () => void;
  addDrawing: () => void;
  addImageFromGallery: () => void;
  isPdfLoaded: boolean;
  savingPdfStatus: boolean;
  savePdf: () => void;
}

export const MenuBar: React.FC<Props> = ({
  openHelp,
  uploadNewPdf,
  addDrawing,
  addImageFromGallery,
  addText,
  addImage,
  isPdfLoaded,
  savingPdfStatus,
  savePdf,
}) => (
  <Menu pointing>
    <Menu.Item header>PDF Editor</Menu.Item>
    <Menu.Menu position="right">
      {isPdfLoaded && (
        <>
          <Dropdown 
            data-testid='edit-menu-dropdown1'
            item 
            closeOnBlur 
            icon="text height" simple
            onClick={addText}
          />
            <Dropdown 
            data-testid='edit-menu-dropdown2'
            item 
            closeOnBlur 
            icon="images" simple
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={addImage}>Add Image</Dropdown.Item>
              <Dropdown.Item onClick={addDrawing}>Add Drawing</Dropdown.Item>
              <Dropdown.Item onClick={addImageFromGallery}>Add Image from Gallery</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            data-testid='save-menu-item'
            disabled={savingPdfStatus}
            onClick={savePdf}
            icon="save" simple

          />
          <Menu.Item
            data-testid='upload-menu-item' 
            name="Upload New" 
            onClick={uploadNewPdf} 
          />
        </>
      )}
      <Menu.Item data-testid="help-menu-item" onClick={openHelp}>
        <Icon name="question circle outline" />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
