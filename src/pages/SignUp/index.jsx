import { Container, Form, Background } from "./styles";

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { api } from '../../services/api'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navegate = useNavigate()

  function handleSingUp() {
    if (!name || !email || !password) {
      alert('Preencha todos os campos')
      return
    }
    api.post('/users', { name, email, password })
      .then(resp => {
        alert('Cadastro realizado com sucesso')
        navegate('/')

      })
      .catch(err => {
        if (err.response) {
          alert(err.response.data.message)

        } else {
          alert('não foi possivel cadastar')
        }
      })
  }


  return (
    <Container>
      <Background />
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação par salve e gerenciar seus links uteis</p>
        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title={'Cadastrar'} onClick={handleSingUp} />

        <Link to="/">
          Voltar para login
        </Link>


      </Form>



    </Container>
  )

}