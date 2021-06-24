import React from 'react'
import { makeStyles, Card, CardHeader, Avatar, CardContent, IconButton, Typography } from '@material-ui/core'
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined'
import { blue, orange, pink, red, yellow } from '@material-ui/core/colors'

const useStyles = makeStyles({
    avatar: {
        backgroundColor: (data) => {
            if(data.category === "Work") return yellow[500]
            if(data.category === "Todo's") return pink[500]
            if(data.category === "Reminder's") return red[500]
            if(data.category === "Birthday's") return orange[500]
            if(data.category === "Random") return blue[500]
        }
    }
})

export default function Template({ data, handler }) {
    const classes = useStyles(data)
    
    return (
        <div>
            <Card elevation = {3}>
                <CardHeader title = { data.title }
                            avatar = { <Avatar className = { classes.avatar }>{ data.category[0].toUpperCase() }</Avatar> }
                            subheader = { data.category }  
                            action = { <IconButton onClick = { () => handler(data.id) }><DeleteOutlineOutlined /></IconButton> }
                />
                <CardContent>
                    <Typography variant = 'body2'
                                align = 'justify'
                    >
                        { data.summary }
                    </Typography>
                </CardContent>
            </Card>  
        </div>
    )
}