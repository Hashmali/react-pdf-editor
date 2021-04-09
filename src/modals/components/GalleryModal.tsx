import React, { useState, createRef, useEffect } from 'react';
import { Modal, Button, Menu, Dropdown, Label } from 'semantic-ui-react';
import { Color } from '../../entities';

interface Props {
  open: boolean;
  dismiss: () => void;
  confirm: (drawing?: {
    width: number;
    height: number;
    path: string;
    strokeWidth: number;
    stroke: string;
  }) => void;
  drawing?: DrawingAttachment;
}

export const GalleryModal = ({ open, dismiss, confirm, drawing }: Props) => {
  const svgRef = createRef<SVGSVGElement>();
  const [paths, setPaths] = useState<Array<[string, number, number]>>([]);
  const [path, setPath] = useState((drawing && drawing.path) || '');
  const [svgX, setSvgX] = useState(0);
  const [svgY, setSvgY] = useState(0);
  const [minX, setMinX] = useState(Infinity);
  const [maxX, setMaxX] = useState(0);
  const [minY, setMinY] = useState(Infinity);
  const [maxY, setMaxY] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [stroke, setStroke] = useState(Color.BLACK);
  const [strokeDropdownOpen, setStrokeDropdownOpen] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const { x, y } = svg.getBoundingClientRect();
    setSvgX(x);
    setSvgY(y);
  }, [svgRef]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(true);

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `M${x},${y}`);
    setPaths([...paths, ['M', x, y]]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!mouseDown) return;

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `L${x},${y}`);
    setPaths([...paths, ['L', x, y]]);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(false);
  };

  const resetDrawingBoard = () => {
    setPaths([]);
    setPath('');
    setMinX(Infinity);
    setMaxX(0);
    setMinY(Infinity);
    setMaxY(0);
    setStrokeWidth(5);
    setStroke(Color.BLACK);
  };

  const handleDone = () => {
    if (!paths.length) {
      confirm();
      return;
    }

    const boundingWidth = maxX - minX;
    const boundingHeight = maxY - minY;

    const dx = -(minX - 10);
    const dy = -(minY - 10);

    confirm({
      stroke,
      strokeWidth,
      width: boundingWidth + 20,
      height: boundingHeight + 20,
      path: paths.reduce(
        (fullPath, lineItem) =>
          `${fullPath}${lineItem[0]}${lineItem[1] + dx}, ${lineItem[2] + dy}`,
       ''
      ),
    });

    closeModal();
  };

  const closeModal = () => {
    resetDrawingBoard();
    dismiss();
  };

  // TODO: Move to config
  const strokeSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleStrokeSelect = (color: Color) => () => {
    setStroke(color);
    setStrokeDropdownOpen(false);
  };

  return (
    <Modal size="small" dimmer="inverted" open={open} onClose={closeModal}>
      <Modal.Header>Choose an image</Modal.Header>
      
    <Modal.Content>
    <div className="ui large images">
  <img className="ui image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c6f1009-9bed-42c1-90b2-5672c47100ef/d6rw4l9-20492a65-8887-49e5-bd17-404d0b824f95.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvN2M2ZjEwMDktOWJlZC00MmMxLTkwYjItNTY3MmM0NzEwMGVmXC9kNnJ3NGw5LTIwNDkyYTY1LTg4ODctNDllNS1iZDE3LTQwNGQwYjgyNGY5NS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.CDWIEzubejByvzKy5T6T099oEqMfCY11xRcdLUD1C0E" />
  <img className="ui image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c6f1009-9bed-42c1-90b2-5672c47100ef/d6rw4l9-20492a65-8887-49e5-bd17-404d0b824f95.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvN2M2ZjEwMDktOWJlZC00MmMxLTkwYjItNTY3MmM0NzEwMGVmXC9kNnJ3NGw5LTIwNDkyYTY1LTg4ODctNDllNS1iZDE3LTQwNGQwYjgyNGY5NS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.CDWIEzubejByvzKy5T6T099oEqMfCY11xRcdLUD1C0E" />
  <img className="ui image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c6f1009-9bed-42c1-90b2-5672c47100ef/d6rw4l9-20492a65-8887-49e5-bd17-404d0b824f95.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvN2M2ZjEwMDktOWJlZC00MmMxLTkwYjItNTY3MmM0NzEwMGVmXC9kNnJ3NGw5LTIwNDkyYTY1LTg4ODctNDllNS1iZDE3LTQwNGQwYjgyNGY5NS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.CDWIEzubejByvzKy5T6T099oEqMfCY11xRcdLUD1C0E" />
  <img className="ui image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c6f1009-9bed-42c1-90b2-5672c47100ef/d6rw4l9-20492a65-8887-49e5-bd17-404d0b824f95.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvN2M2ZjEwMDktOWJlZC00MmMxLTkwYjItNTY3MmM0NzEwMGVmXC9kNnJ3NGw5LTIwNDkyYTY1LTg4ODctNDllNS1iZDE3LTQwNGQwYjgyNGY5NS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.CDWIEzubejByvzKy5T6T099oEqMfCY11xRcdLUD1C0E" />
</div>
      
      
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" content="Cancel" onClick={closeModal} />
        <Button
          content="Done"
          labelPosition="right"
          icon="checkmark"
          onClick={handleDone}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
