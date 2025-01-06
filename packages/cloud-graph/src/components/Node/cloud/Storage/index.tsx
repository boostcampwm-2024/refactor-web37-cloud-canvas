import type { Dimension, GridSize, Node } from '@/types';
import Storage2D from './Storage2D';
import Storage3D from './Storage3D';

export type StorageProps = {
    size: Node['size'];
    dimension: Dimension;
};

function Storage(props: StorageProps) {
    const { size, dimension } = props;
    return dimension === '3d' ? (
        <Storage3D size={size[dimension] as Required<GridSize>} />
    ) : (
        <Storage2D size={size[dimension]} />
    );
}

export default Storage;
