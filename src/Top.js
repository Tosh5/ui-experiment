import React from 'react'
import './css/top.css'
import { BrowserRouter, Route, Switch, Link, useNavigate} from 'react-router-dom';

const Top = () => {

  const navigate = useNavigate()

  return (
    <div>
        <h1>玉入れ合戦</h1>
        <h3>あなたの応援が勝利を決める！</h3>

        <div className="buttonContainer">
          <button className='button' style={{backgroundColor: 'darkred'}} onClick={() => navigate('/support')}>Support画面へ</button>
          <button className='button' style={{backgroundColor: 'darkblue'}} onClick={() => navigate('/booing')}>ブーイング画面へ</button>
        </div>
        <button className='button admin' style={{backgroundColor: '#555555'}} onClick={() => navigate('/admin')}>管理画面</button>


    </div>
  )
}

export default Top