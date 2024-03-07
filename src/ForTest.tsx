import { Box } from "./components/Boxes";
import { PageBlock } from "./components/PageBlock";
import array from './components/template50mode2.json'

export default function ForTests() {
  return (
    <Box>
      {array.map((item, index) => (
        <PageBlock 
          key={index} // Adicione uma chave única para cada item mapeado
          layoutType={item.blocksData.centerMiddle.template}
          content={item.blocksData.centerMiddle}
        />
      ))}
    </Box>
  )
}
