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
    return (
        <g transform={transform} onMouseDown={handleMouseDown}>
            <Component size={node.size} dimension={dimension} />
        </g>
    );
}

export default Node;
