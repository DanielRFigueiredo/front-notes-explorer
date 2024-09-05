import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'
import { FiPlus } from 'react-icons/fi'
import { Note } from '../../components/Note';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { api } from '../../services/api';


export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])

  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState([])

  const navegate = useNavigate()

  function handleSelectTag(tag) {
    if (tag === 'todos') {
      return setTagsSelected([])
    }

    if (tagsSelected.includes(tag)) {
      return setTagsSelected(prev => prev.filter(t => t !== tag))
    }
    setTagsSelected(prev => [...prev, tag])
  }

  function handleDetails(id) {

    navegate(`/details/${id}`)
  }


  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags')
      setTags(response.data);
    }
    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected.join(',')}`)
      setNotes(response.data);
    }
    fetchNotes()

  }, [tagsSelected, search])


  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header />
      <Menu>
        <li>
          <ButtonText
            title='Todos'
            isActive={tagsSelected.length === 0}
            onClick={() => handleSelectTag('todos')}
          />
        </li>
        {tags && tags.map(tag => (
          <li key={String(tag.id)}>
            <ButtonText
              title={tag.name}
              isActive={tagsSelected.includes(tag.name)}
              onClick={() => handleSelectTag(tag.name)}
            />
          </li>
        ))}

      </Menu>

      <Search>
        <Input
          placeholder='pesquisar pelo titulo'
          onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title='Minhas notas'>
          {notes && notes.map(note => (
            <Note key={note.id} data={note} onClick={() => handleDetails(note.id)} />
          ))}

        </Section>

      </Content>

      <NewNote to='/new'>
        <FiPlus />
        Criar nota
      </NewNote>

    </Container>
  )

}