import React from 'react';
import { PageBlock } from '../types';

interface WithLayoutControlProps {
  block: PageBlock;
  layout?: 'single' | 'grid';
}

export const withLayoutControl = <P extends WithLayoutControlProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function WithLayoutControl(props: P) {
    // Se o bloco for do tipo list e a variante for thumbnail, permitimos o controle de layout
    const shouldControlLayout = props.block.template === 'list' && 
      props.block.variants?.[0]?.variantType === 'thumbnail';

    // Se não devemos controlar o layout, passa as props originais
    if (!shouldControlLayout) {
      return <WrappedComponent {...props} />;
    }

    // Se devemos controlar o layout, injeta a prop de layout
    const layout = props.layout || 'single';
    
    return (
      <WrappedComponent 
        {...props} 
        layout={layout}
      />
    );
  };
};

export default withLayoutControl; 