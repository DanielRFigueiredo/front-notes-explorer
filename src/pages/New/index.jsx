import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { api } from '../../services/api'


import { TextArea } from '../../components/TextArea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'

import { Container, Form } from './styles'

export function New() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState('')

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  const navigate = useNavigate()

  function handleAddLink() {
    setLinks(prev => [...prev, newLink])
    setNewLink('')
  }

  function handleRemoveLink(link) {
    setLinks(prev => prev.filter(l => l !== link))
  }

  function handleAddTag() {
    setTags(prev => [...prev, newTag])
    setNewTag('')
  }

  function handleRemoveTag(tag) {
    setTags(prev => prev.filter(t => t !== tag))
  }

  async function handleNewNote() {
    if (!title) {
      return alert('adicione um titulo')
    }

    if (newTag) {
      return alert('adicione uma tag')
    }
    if (newLink) {
      return alert('adicione uma link')
    }

    await api.post('/notes', {
      title,
      description,
      tags,
      links
    })

    alert('nota criada com sucesso')
    navigate(-1)
  }

  return (
    <Container>
      <Header />
      <main>
        <Form onSubmit={(e) => e.preventDefault()}>
          <header>
            <h1>criar nota</h1>
            <ButtonText title='Voltar' onClick={() => navigate(-1)} />
          </header>

          <Input
            placeholder="titulo"
            onChange={e => setTitle(e.target.value)}
          />

          <TextArea
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem key={String(index)} value={link} onClick={() => handleRemoveLink(link)} />
            ))}
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className='tags'>
              {tags.map((tag, index) => (
                <NoteItem key={String(index)} value={tag} onClick={() => handleRemoveTag(tag)} />
              ))}
              <NoteItem
                isNew
                placeholder="Nova Tag"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )


}