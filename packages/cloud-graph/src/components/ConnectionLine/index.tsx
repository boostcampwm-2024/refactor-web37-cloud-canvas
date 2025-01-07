import { IsoMatrix } from '@/constants';
import { ScreenPoint } from '@/types';

type ConnectionLineProps = {
    from: ScreenPoint;
    to: ScreenPoint;
};

const isoMatrixInverse = IsoMatrix.inverse();

function screenToIsoPoint(x: number, y: number) {
    const p = isoMatrixInverse.transformPoint({ x, y });
    return { x: p.x, y: p.y };
}

function ConnectionLine(props: ConnectionLineProps) {
    const { from, to } = props;

    //INFO: 역함수를 통해 위치 조정
    const isoFrom = screenToIsoPoint(from.x, from.y);
    const isoTo = screenToIsoPoint(to.x, to.y);

    return (
        <g transform={IsoMatrix.toString()}>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="10"
                    refY="5"
                    markerWidth="15"
                    markerHeight="15"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>

            <line
                x1={isoFrom.x}
                y1={isoFrom.y}
                x2={isoTo.x}
                y2={isoTo.y}
                stroke="black"
                marker-end="url(#arrow)"
            />
        </g>
    );
}

export default ConnectionLine;
