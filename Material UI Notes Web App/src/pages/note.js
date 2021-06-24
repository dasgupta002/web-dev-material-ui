import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import Template from '../components/card'
import { Container, Typography, Grid } from '@material-ui/core'

export default function Notes() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetch('http://localhost:60/notes')
             .then((response) => response.json())
             .then((data) => setNotes(data))
    }, [])
    
    const handleRemove = (id) => {
        fetch('http://localhost:60/notes/' + id, {
            method: 'DELETE'
        }).then(() => {
            const papers = notes.filter((note) => note.id !== id)
            setNotes(papers)
        })
    }

    return(
        <Container>
          <Typography variant = "h5"
                      component = "h2"
                      color = "textSecondary"
                      gutterBottom
          > 
            My Notes!
          </Typography>
          <Masonry breakpointCols = {{ default: 3, 1100: 2, 700: 1 }}
                   className = "my-masonry-grid"
                   columnClassName = "my-masonry-grid_column"
          >  
            { notes.map((note) => {
                return(
                    <div><Template data = { note } handler = { handleRemove } /></div>
                )
            }) }
          </Masonry>  
        </Container>
    )
}