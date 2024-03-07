import PageHome from './cms-operations/PageHome';
import {Anchor} from './components/Anchor';
import { Box } from './components/Boxes';
import { Image } from './components/Image';

const App = () => {
  return (
    <Box
    >
      <PageHome />
      {/* <Anchor
        href="http://www.google.com"
        target='_blank'
        customCss={{
          color: '#7159c1',
          fontWeight: "bold"
        }}
        >
        Clique aqui
      </Anchor>
      <Image 
        desktop_image_path='http://localhost:3001/uploads/a96788fcc1e5ea73af18-desk-nextproject-panvel_vita_c.jpg'
        mobile_image_path='http://localhost:3001/uploads/18c59e118a3d5d057ade-mob-nextproject-panvel_vita_c.jpg'
        alt="Imagem Name"
        customCss={{
          borderRadius: 4
        }}
      /> */}
    </Box>
  );
};

export default App;