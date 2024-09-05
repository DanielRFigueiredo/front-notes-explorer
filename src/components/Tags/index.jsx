import { Container } from './styles.js'

export function Tags({ title, ...rest }) {
  return (
    <Container {...rest}>
      {title}
    </Container>
  )


}