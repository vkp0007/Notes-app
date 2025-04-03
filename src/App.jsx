import './App.css'
import AddNote from './components/AddNote'
import NoteList from './components/NoteList'
import NavBar from './components/NavBar'
import Notes from './components/ViewNote'

import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<><NavBar /><AddNote /></>} />
          <Route path="/notes" element={<><NavBar /><NoteList /></>} />
          <Route path="/notes/:id" element={<Notes/>} />
          <Route path="/update/:id" element={<AddNote />}/>
          
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
