interface Image {
  /** captação para imagem  */
  caption: string
  /** data de criação  */
  created_at: string
  /** creditos para imagem  */
  credits: string
  /** descrição para imagem  */
  description: string
  /** id para imagem  */
  id: number
  /** nome para imagem  */
  name: string
  /** url para consumo da imagem  */
  url: string
}

export interface Album {
  images: Image[]
  /** função que lida com as informações da imagem selecionada */
  handleSelectImage: (index: any) => VoidFunction
  /** captação da URL de despacho para imagem
   * ex: http://localhost:3001/uploads/${nomeDoArquivo}?width=${breakpoints}&height=${newHeight}
  */
  apiUploadURL: string
}
