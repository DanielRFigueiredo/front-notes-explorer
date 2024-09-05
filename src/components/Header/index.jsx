import { RiShutDownLine } from 'react-icons/ri'

import { useNavigate } from 'react-router-dom'

import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { useAuth } from '../../hooks/auth.jsx'
import { api } from '../../services/api'

import { Container, Profile, Logout } from './styles.js'

export function Header() {
  const { signOut, user } = useAuth()
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  const navigate = useNavigate()
  function handleSignOut() {
    navigate('/')
    signOut()

  }

  return (
    <Container>
      <Profile to='/profile'>
        <img src={avatarUrl} alt="foto usuario" />
        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>

    </Container>
  )


}
