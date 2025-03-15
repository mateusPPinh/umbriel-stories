
import { Dispatch, SetStateAction } from "react";

export interface TabPagesProps {
  selectedPage: string | null;
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  isPagesLoading: boolean;
  pageData: Array<{ id: string; title: string }> | undefined;
}

export interface VariantSelectorProps {
  blockType: string;
  selectedVariant: string;
  setSelectedVariant: Dispatch<SetStateAction<string>>;
}

export interface BlockTypeSelectorProps {
  blockType: string;
  setBlockType: Dispatch<SetStateAction<string>>;
}