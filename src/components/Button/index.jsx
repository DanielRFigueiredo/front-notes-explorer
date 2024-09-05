import { Container } from './styles.js'

export function Button({ title, loading, ...rest }) {
  return loading
    ? <Container disabled>Carregando</Container>
    : <Container {...rest}>{title}</Container>


}