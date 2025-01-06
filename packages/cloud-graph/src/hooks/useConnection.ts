import type { Dimension, Node, ScreenPoint } from '@/types';
import {
    getAbsoluteConnectorPoints,
    getNearestPoint,
    getSvgPoint,
} from '@/utils';
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

    /**
     * @param node - from node
     * @param point - cursor point
     */
    const startConnection = (node: Node, point: ScreenPoint) => {
        fromNode.current = node;

        const connectorPoints = getAbsoluteConnectorPoints(
            fromNode.current,
            dimension,
        );
        const svgPoint = getSvgPoint(svgRef.current!, point);

        const nearestPoint = getNearestPoint(connectorPoints.screen, svgPoint);

        setStartPoint(nearestPoint);
        setEndPoint(nearestPoint);
        setIsConnecting(true);
    };

    const connect = (point: ScreenPoint) => {
        if (fromNode.current === null || !isConnecting) return;
        const connectorPoints = getAbsoluteConnectorPoints(
            fromNode.current,
            dimension,
        );
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
