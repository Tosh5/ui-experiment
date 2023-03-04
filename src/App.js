import { Routes, Route } from 'react-router-dom';

import React from 'react'
import Support from './Support'
import Top from './Top'
import Admin from './Admin';
import Neg from './Neg';
import Guide from './Guide';
import GuideFrontend from './GuideFrontend';
import Robot from './Robot';
import Robot2 from './Robot2';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/support" element={<Support />} />
        <Route path="/neg" element={<Neg />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guideFrontend" element={<GuideFrontend />} />
        <Route path="/robot" element={<Robot />} />
        <Route path="/robot2" element={<Robot2 />} />

      </Routes>
    </div>
  )
}

export default App