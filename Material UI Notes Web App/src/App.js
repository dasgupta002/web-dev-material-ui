import Layout from './components/layout'
import Notes from './pages/note'
import Create from './pages/edit'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' 
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Handlee'
    }
})

function App() {
  return (
    <ThemeProvider theme = { theme }>
      <Router>
        <Layout>
          <Switch>
            <Route exact path = "/">
              <Notes />
            </Route>
            <Route path = "/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App