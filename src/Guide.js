import React from 'react'
import './css/top.css'
import { useNavigate} from 'react-router-dom';

const Guide = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>玉入れ合戦とは？</h1>
      <p>攻守交代型の玉入れゲームにおける、応援とブーイングの強度をリアルタイムに解析して画面表示するシステムです。</p>
      <p>通常の玉入れでは、二つのカゴがありますが、今回は一つのかごのみを用いて、赤組と青組で交互にプレイすることを想定しています。</p>
      <br></br>
      <h2>応援するには？</h2>
      <p>トップ画面にて「応援する」ボタンを選択してください</p>
      <p>応援は、カメラを用いた動作解析と、マイクを用いた発話解析の二つを組み合わせて、応援の強度が推定されます。</p>
      <br></br>
      <h2>ブーイングするには？</h2>
      <p>トップ画面にて「ヤジを飛ばす」ボタンを選択してください</p>


      <button className='guide_button' style={{backgroundColor: '#555555'}} onClick={() => navigate('/')}>戻る</button>
    </div>
  )
}

export default Guide