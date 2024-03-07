import {Header} from "../../../../cms-operations/components/Header";

type Menu = {
  title: string;
  href: string;
};

type Footer = {
  footer?: {
    title_top: string;
    title_bottom: string;
  };
}

type Carrousel = {
  layoutCarrousel?: {
    image_middle_desktop_path?: string;
    image_mobile_path?: string;
  };
}

type GenericProps = {
  menu?: Menu[];
  footer?: Footer[];
  carrousel?: Carrousel[];
}

export default function Template100(props: GenericProps) {
  const {menu, footer, carrousel} = props;
  console.log(menu, footer, carrousel)
  return (
    <>
      {menu && (
      <Header menu={menu} />
    )}
    </>
  )
}