import type { Dimension, Node, ScreenPoint } from '@/types';
import { getNearestPoint, getSvgPoint, gridToScreen } from '@/utils';
import { useRef, useState } from 'react';

type UseConnectNodeProps = {
    svgRef: React.RefObject<SVGSVGElement>;
    dimension: Dimension;
};

const useConnection = (props: UseConnectNodeProps) => {
    const { svgRef, dimension } = props;

    const fromNode = useRef<Node | null>(null);
    const [startPoint, setStartPoint] = useState<ScreenPoint | null>(null);
    const [endPoint, setEndPoint] = useState<ScreenPoint | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const getAbsoluteConnectorPoints = (node: Node) => {
        const { point, size, connectors } = node;
        const centerGridPoint = {
            col: point.col + size[dimension].cols / 2,
            row: point.row + size[dimension].rows / 2,
        };

        const gridPoints = connectors.map((connector) => ({
            col: centerGridPoint.col + connector.col,
            row: centerGridPoint.row + connector.row,
        }));
        const screenPoints = gridPoints.map((gridPoint) =>
            gridToScreen(gridPoint, dimension),
        );

        return {
            grid: gridPoints,
            screen: screenPoints,
        };
    };

    /**
     * @param node - from node
     * @param point - cursor point
     */
    const startConnection = (node: Node, point: ScreenPoint) => {
        fromNode.current = node;

        const connectorPoints = getAbsoluteConnectorPoints(fromNode.current);
        const svgPoint = getSvgPoint(svgRef.current!, point);

        const nearestPoint = getNearestPoint(connectorPoints.screen, svgPoint);

        setStartPoint(nearestPoint);
        setEndPoint(nearestPoint);
        setIsConnecting(true);
    };

    const connect = (point: ScreenPoint) => {
        if (fromNode.current === null || !isConnecting) return;
        const connectorPoints = getAbsoluteConnectorPoints(fromNode.current);
        const svgPoint = getSvgPoint(svgRef.current!, point);

        const nearestPoint = getNearestPoint(connectorPoints.screen, svgPoint);

        setStartPoint(nearestPoint);
        setEndPoint(svgPoint);
    };

    const stopConnection = () => {
        fromNode.current = null;
        setStartPoint(null);
        setEndPoint(null);
        setIsConnecting(false);
    };

    return {
        startConnection,
        connect,
        stopConnection,
        startPoint,
        endPoint,
        isConnecting,
    };
};

export default useConnection;
