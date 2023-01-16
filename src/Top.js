import React from 'react'
import './css/top.css'
import { useNavigate} from 'react-router-dom';

const Top = () => {

  const navigate = useNavigate()

  return (
    <div className='top-container'>
      <p>※ https://cheer-app3.onrender.com/ のサーバが閉じていると、サービスを利用できません。</p>
        <h1>玉入れ合戦</h1>
        <h3>あなたの応援が勝利を決める！</h3>
        <div className="selector">
          <p>↓この試合を?↓</p>
          <div className="buttonContainer">
            <button className='button' style={{backgroundColor: '#C1272D'}} onClick={() => navigate('/support')}>応援する</button>
            <button className='button' style={{backgroundColor: '#0071BC'}} onClick={() => navigate('/neg')}>ヤジを飛ばす</button>
          </div>
        </div>
        <button className='guide_button' style={{backgroundColor: '#555555'}} onClick={() => navigate('/guide')}>トリセツ</button>
        <button className='admin_button' style={{backgroundColor: '#555555'}} onClick={() => navigate('/admin')}>管理画面</button>


    </div>
  )
}

export default Top