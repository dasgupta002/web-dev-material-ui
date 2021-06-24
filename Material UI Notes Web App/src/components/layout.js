import React from 'react'
import { format } from 'date-fns'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles, AppBar, Avatar, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import SubjectOutlined from '@material-ui/icons/SubjectOutlined'
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex'
        },
        app: {
            width: `calc(100% - 240px)`
        },
        profile: {
            marginLeft: theme.spacing(2)
        },
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(4)
        },
        draw: {
            width: 240
        },
        title: {
            padding: theme.spacing(2)
        },
        paper: {
            width: 240
        }, 
        active: {
            background: '#f4f4f4'
        },
        tool: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles()
    
    const history = useHistory()
    const location = useLocation()

    const menu = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color = "secondary" />,
            path: '/'
        },
        {
            text: 'Add Note',
            icon: <AddCircleOutlineOutlined color = "secondary" />,
            path: '/create'
        }
    ]

    return (
        <div className = { classes.root }>
            <AppBar color = 'inherit'
                    className = { classes.app }
                    elevation = {0}
            >
                <Toolbar>
                    <Typography className = { classes.date }>
                        Today is  the { format(new Date(), 'do MMMM Y') }!
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src = "./images/mario.jpg" className = { classes.profile } />
                </Toolbar>
            </AppBar>
            <Drawer variant = "permanent"
                    anchor = "left"
                    classes = {{ paper: classes.paper }}
                    className = { classes.draw }
            >
                <div>
                    <Typography variant = "h5"
                                color = "secondary"
                                className = { classes.title }
                    >
                        Ninja Notes
                    </Typography>
                </div>
                <div>
                    <List>
                        { menu.map((item) => {
                            return(
                                <ListItem button
                                          className = { location.pathname === item.path ? classes.active : null }
                                          onClick = { () => history.push(item.path) }
                                >
                                    <ListItemIcon>{ item.icon }</ListItemIcon>
                                    <ListItemText primary = { item.text } />
                                </ListItem>
                            )
                        }) }
                    </List>
                </div>
            </Drawer>
            <div className = { classes.page }>
                <div className = { classes.tool }></div>
                { children }
            </div>
        </div>
    )
}