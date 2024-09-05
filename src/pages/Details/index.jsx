import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { api } from '../../services/api.js'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'
import { Tags } from '../../components/Tags'

import { Container, Links, Content } from './styles.js'

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }
    fetchNotes()


  }, [])

  function handleBack() {
    navigate(-1)
  }

  async function deleteNote() {

    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>


            <ButtonText title='excluir nota' onClick={deleteNote} />

            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>


            {data.links && <Section title="Links úteis">
              <Links>
                {data.links.map(link => (
                  <li key={link.id}>
                    <a href={link.url} target="_blank" >{link.url}</a>
                  </li>
                ))}
              </Links>
            </Section>
            }

            {data.tags &&
              <Section title="Marcadores">

                {data.tags.map(tag => (
                  <Tags title={tag.name} key={tag.id} />
                ))}
              </Section>}

            <Button title='Voltar' onClick={handleBack} />
          </Content>
        </main>
      }
    </Container >

  )


}