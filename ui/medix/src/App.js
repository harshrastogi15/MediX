import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Message from './components/Chat/Message';
// import Dictaphone from './components/Dictaphone';
import { useEffect } from 'react';
import ResponsiveAppBar from './components/Navbar/Navbar'

function App() {

  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar/>
        <div>Medix</div>
        
        {/* <Message/> */}

        <Routes>
          <Route path='/chat' element={<Message/>} />
          {/* <Route path='/' element={<Dictaphone/>} /> */} 
        </Routes>
      </div>

    </Router>
  );
}

export default App;
