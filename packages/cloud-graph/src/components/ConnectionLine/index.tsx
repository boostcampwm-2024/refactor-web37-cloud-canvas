import { ScreenPoint } from '@/types';

type ConnectionLineProps = {
    from: ScreenPoint;
    to: ScreenPoint;
};
function ConnectionLine(props: ConnectionLineProps) {
    const { from, to } = props;
    const linePathD = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

    return (
        <g>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="5"
                    refX="5"
                    refY="2.5"
                    orient="auto"
                >
                    <path d="M 0 0 L 5 2.5 L 0 5 Z" fill="#000" />
                </marker>
            </defs>
            <path
                d={linePathD}
                stroke="#000"
                fill="none"
                strokeWidth={3}
                markerEnd="url(#arrowhead)"
            />
        </g>
    );
}

export default ConnectionLine;
