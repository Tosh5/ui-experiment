import { Routes, Route } from 'react-router-dom';

import React from 'react'
import Support from './Support'
import Top from './Top'
import Booing from './Booing';
import Admin from './Admin';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/support" element={<Support />} />
        <Route path="/booing" element={<Booing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App