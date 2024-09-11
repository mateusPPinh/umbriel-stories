import { type ReactElement } from 'react'

export default function Player(): ReactElement {
  return (
    <video className="h-full w-full rounded-lg" controls autoPlay muted>
      <source
        src="https://pub-e9274c1f91bc4ae9a98c76f02f2938d4.r2.dev/utomp3.com%20-%20Trilhas%20indi%CC%81genas%20EP%203%20%20Djuena%20Tikuna%20djuenatikuna_1080p.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  )
}
