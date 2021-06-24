import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, makeStyles } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles({
    field: {
        marginTop: 15,
        marginBottom: 15,
        display: 'block'
    }
})

export default function Create() {
    const classes = useStyles()

    const history = useHistory()
    
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [category, setCategory] = useState('random')
    const [titleError, setTitleError] = useState(false)
    const [summaryError, setSummaryError] = useState(false)

    const handleForm = (event) => {
        event.preventDefault()

        if(title === '') {
            setTitleError(true)
        } else {
            setTitleError(false)
        }

        if(summary === '') {
            setSummaryError(true)
        } else {
            setSummaryError(false)
        }

        if(title && summary) {
            fetch('http://localhost:60/notes', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ title, summary, category })
            }).then(() => history.push('/'))
        }
    }

    return(
        <Container>
            <Typography variant = "h5"
                        component = "h2"
                        color = "textSecondary"
                        gutterBottom
            > 
                Create New Note!
            </Typography>
            <form autoComplete = "off" onSubmit = { handleForm } noValidate>
                <TextField variant = "outlined"
                           label = "Note Title"
                           className = { classes.field }
                           value = { title }
                           onChange = { ({ target }) => setTitle(target.value) }
                           error = { titleError }
                           fullWidth
                           required
                />
                <TextField variant = "outlined"
                           label = "Note Summary"
                           className = { classes.field }
                           value = { summary }
                           onChange = { ({ target }) => setSummary(target.value) }
                           error = { summaryError }
                           rows = { 5 }
                           multiline
                           fullWidth
                           required
                />
                <FormControl className = { classes.field }>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup value = { category }
                                onChange = { ({ target }) => setCategory(target.value) }
                    >
                        <FormControlLabel control = { <Radio /> } label = "Work" value = "Work" /> 
                        <FormControlLabel control = { <Radio /> } label = "Todo's" value = "Todo's" />
                        <FormControlLabel control = { <Radio /> } label = "Reminder's" value = "Reminder's" />
                        <FormControlLabel control = { <Radio /> } label = "Birthday's" value = "Birthday's" />
                        <FormControlLabel control = { <Radio /> } label = "Random" value = "Random" />
                    </RadioGroup>
                </FormControl>
                <Button variant = "contained"
                        color = "secondary"
                        type = "submit"
                        endIcon = { <KeyboardArrowRightIcon /> }
                >
                    Save
                </Button>
            </form>
        </Container>
    )
}