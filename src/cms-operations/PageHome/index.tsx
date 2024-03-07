import { Box } from "../../components/Boxes";
import { PageBlockRenderer } from "../../components/PageBlock";
import array from '../../components/template50mode2.json';

const PageHome = () => {
  return (
    <Box>
      {array.map((block, index) => {
        const { template, layout, menu, footer, layoutCarrousel, centerMiddle } = block.blocksData;

        return (
          <PageBlockRenderer
            key={index}
            template={template}
            layout={layout}
            genericCarrousel={layoutCarrousel}
            genericFooter={footer}
            genericMenu={menu}
            centerMiddle={centerMiddle}
          />
        );
      })}
    </Box>
  );
};

export default PageHome;