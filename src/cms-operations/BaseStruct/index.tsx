import { Box } from "../../components/Boxes";

export default function BaseStruct(props) {
  return (
    <Box>
      {props.children}
    </Box>
  )
}