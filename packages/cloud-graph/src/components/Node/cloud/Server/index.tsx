import type { Dimension, GridSize, Node } from '@/types';
import Server2D from './Server2D';
import Server3D from './Server3D';

export type ServerProps = {
    size: Node['size'];
    dimension: Dimension;
};

function Server(props: ServerProps) {
    const { size, dimension } = props;
    return dimension === '3d' ? (
        <Server3D size={size[dimension] as Required<GridSize>} />
    ) : (
        <Server2D size={size[dimension]} />
    );
}

export default Server;
