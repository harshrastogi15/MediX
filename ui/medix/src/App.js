import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Message from './components/Chat/message';
import Dictaphone from './components/Dictaphone';
import { useEffect } from 'react';


function App() {

  return (
    <Router>
      <div className="App">
        <div>Medix</div>
        
        {/* <Message/> */}

        <Routes>
          <Route path='/' element={<Dictaphone/>} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
