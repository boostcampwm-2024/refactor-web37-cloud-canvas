import Stroke from '@/components/Svg/Stroke';
import { GRID_WIDTH_3D } from '@/constants';
import { GridSize } from '@/types';

type Storage3DProps = {
    size: Required<GridSize>;
};

function Storage3D(props: Storage3DProps) {
    const { size } = props;

    const strokePoints = [
        { x: 50.313, y: 1.155 },
        { x: 1.214, y: 29.501 },
        { x: 25.763, y: 100.367 },
        { x: 50.313, y: 114.54 },
        { x: 74.861, y: 100.367 },
        { x: 99.41, y: 29.501 },
    ];

    //INFO: 상수 숫자:= svg가 Grid에 맞게 조정하기 위한 값
    const adjustPoint = {
        x: -(GRID_WIDTH_3D / 2) * size.cols + 13.687, //(13.687 := 128 - 100.626)
        y: -62.137, //(-1.155 * 2 - 74 + (114.54 - 100.367) )
    };

    return (
        <svg
            x={adjustPoint.x}
            y={adjustPoint.y}
            width="100.626"
            height="115.695"
        >
            <path
                fill="#4286c5"
                d="M50.313 1.155v56.693L99.41 29.501z"
                fillRule="evenodd"
            ></path>
            <path
                fill="#26527b"
                d="m1.215 29.501 49.098 28.347V1.155z"
                fillRule="evenodd"
            ></path>
            <path fill="none" stroke="#020406" d="M50.313 1.155v56.693"></path>
            <path
                fill="#26527b"
                d="M50.313 57.847 99.41 29.501l-24.549 70.866-24.548 14.173z"
                fillRule="evenodd"
            ></path>
            <path
                fill="#326ca2"
                d="m1.215 29.501 49.098 28.347v56.692l-24.55-14.173z"
                fillRule="evenodd"
            ></path>
            <path
                fill="none"
                stroke="#0e1e2d"
                d="m1.215 29.501 49.098 28.347L99.41 29.501 50.313 57.848v56.692"
            ></path>
            <Stroke points={strokePoints} />
        </svg>
    );
}

export default Storage3D;
