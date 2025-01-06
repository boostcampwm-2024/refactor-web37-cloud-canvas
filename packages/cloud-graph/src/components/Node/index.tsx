import type { Dimension, Node as NodeType, ScreenPoint } from '@/types';
import { gridToScreen } from '@/utils';

type NodeProps = {
    node: NodeType;
    dimension: Dimension;
    isSelected: boolean;
    onSelect: (nodeId: string) => void;
    onStartDrag: (nodeId: string, point: ScreenPoint) => void;
};

function Node(props: NodeProps) {
    const { node, dimension, onSelect, onStartDrag } = props;
    const { Component } = node;

    const screenPoint = gridToScreen(node.point, dimension);
    const transform = `translate(${screenPoint.x}, ${screenPoint.y})`;

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();

        onSelect(node.id);

        const { clientX, clientY } = e;
        onStartDrag(node.id, { x: clientX, y: clientY });
    };

    const centerGridPoint = {
        col: node.point.col + node.size[dimension].cols / 2,
        row: node.point.row + node.size[dimension].rows / 2,
    };
    const centerScreenPoint = gridToScreen(centerGridPoint, dimension);
    return (
        <>
            <g transform={transform} onMouseDown={handleMouseDown}>
                <Component size={node.size} dimension={dimension} />
            </g>
            <circle
                cx={centerScreenPoint.x}
                cy={centerScreenPoint.y}
                r={5}
                fill="red"
            />
        </>
    );
}

export default Node;
