/* eslint-disable @typescript-eslint/no-explicit-any */
export type Template50Types = {
  blockPosition?: number;
  layout?: string;
  template?: string;
  maxImagesLeft?: number;
  maxImagesRight?: number;
  slot_right_items?: {
    content: Array<any>;
  };
  slot_left_items?: {
    content: Array<any>;
  };
  slot_left_bgColor?: string;
  slot_right_bgColor?: string;
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
}