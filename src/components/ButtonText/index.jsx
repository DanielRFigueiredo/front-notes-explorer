import { Container } from './styles.js'

export function ButtonText({ title, isActive = false, ...rest }) {
  return (
    <Container $isactive={isActive} type="button" {...rest}>{title}</Container>
  )
}