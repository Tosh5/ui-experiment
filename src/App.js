import { Routes, Route } from 'react-router-dom';

import React from 'react'
import Support from './Support'
import Top from './Top'
import Booing from './Booing';
import Admin from './Admin';
import Booing2 from './Booing2';
import Neg from './Neg';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/support" element={<Support />} />
        <Route path="/neg" element={<Neg />} />

        <Route path="/booing" element={<Booing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booing2" element={<Booing2 />} />
        <Route path="/neg" element={<Neg />} />
      </Routes>
    </div>
  )
}

export default App