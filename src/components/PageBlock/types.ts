/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenericItemsType = {
  generics?: {
    menu?: {
      title: string;
      href: string;
    };
    footer?: {
      title_top: string;
      title_bottom: string;
    };
    layoutCarrousel?: {
      image_middle_desktop_path?: string;
      image_mobile_path?: string;
    };
  }
}

type CenterMiddleType = {
  blockPosition: number;
  layout: string;
  template: string;
  items: Array<{
    slot_right_items: {
      content: Array<any>;
    };
    slot_left_items: {
      content: Array<any>;
    };
    images?: {
      slot_left_images: Array<{
        image_middle_desktop_path: string;
        image_mobile_path: string;
      }>;
      slot_right_images: Array<{
        image_middle_desktop_path: string;
        image_mobile_path: string;
      }>;
    };
  }>;
};

export type PageBlockTypes = {
  layout?: string;
  genericCarrousel?: GenericItemsType['generics']['layoutCarrousel'];
  genericFooter?: GenericItemsType['generics']['footer'];
  genericMenu?: GenericItemsType['generics']['menu'];
  template: 'Template5050' | 'Template100';
  items?: {
    slot_left_items?: {
      content: any[];
    };
    slot_right_items?: {
      content: any[];
    };
  };
  centerMiddle?: CenterMiddleType;
};
