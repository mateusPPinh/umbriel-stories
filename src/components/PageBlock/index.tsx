import { Template5050 } from "../Templates/by-definitions/5050";
import Template100 from "../Templates/by-definitions/100";
import { PageBlockTypes } from "./types";

const PageBlockRenderer: React.FC<PageBlockTypes> = (props) => {
  const { template, genericCarrousel, genericFooter, genericMenu, centerMiddle } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const templateComponentMap: any = {
    'Template5050': Template5050,
    'Template100': Template100,
  };

  const renderTemplates = () => {
    const templates = [];

    if (template === 'Template100') {
      const Template = templateComponentMap[template];
      templates.push(
        <Template
          key="Template100"
          menu={genericMenu}
          footer={genericFooter}
          carrousel={genericCarrousel}
        />
      );
    }

    if (centerMiddle && centerMiddle.template === 'Template5050') {
      const Template = templateComponentMap[centerMiddle.template];
      const { slot_left_items, slot_right_items } = centerMiddle.items[0];
      templates.push(
        <Template
          key="Template5050"
          slot_left_items={slot_left_items}
          slot_right_items={slot_right_items}
          maxImagesLeft={4}
          maxImagesRight={4}
        />
      );
    }

    // TODO: add a custom fallback
    if (templates.length === 0) {
      return <div>Nenhum template para renderizar.</div>;
    }

    return templates;
  };

  return <>{renderTemplates()}</>;
};

export {PageBlockRenderer}