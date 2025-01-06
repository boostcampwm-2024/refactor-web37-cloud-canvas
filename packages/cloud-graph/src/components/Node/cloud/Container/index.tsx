import type { Dimension, GridSize, Node } from '@/types';
import Container2D from './Container2D';
import Container3D from './Container3D';

export type ContainerProps = {
    size: Node['size'];
    dimension: Dimension;
};

function Container(props: ContainerProps) {
    const { size, dimension } = props;
    return dimension === '3d' ? (
        <Container3D size={size[dimension] as Required<GridSize>} />
    ) : (
        <Container2D size={size[dimension]} />
    );
}

export default Container;
