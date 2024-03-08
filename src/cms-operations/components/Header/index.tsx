import { Box } from "../../../components/Boxes";
import { Text } from "../../../components/Typography";

type HeaderProps = {
  menu: {
    title: string;
    href: string;
  }[];
};

export function Header({ menu }: HeaderProps) {
  return (
    <Box
      as="header"
      css={{
        width: '100%',
        bgColor: '#1A2035',
        height: '6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
      }}
    >
      <Text css={{color: 'white'}}>umbriel pageblock header</Text>
      <nav>
        {menu.map((item, index) => (
          <a key={index} href={item.href} style={{ margin: '0 1rem', color: '#fff' }}>{item.title}</a>
        ))}
      </nav>
    </Box>
  );
}
