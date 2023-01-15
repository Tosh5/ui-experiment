import React from 'react'
import './css/top.css'
import { useNavigate} from 'react-router-dom';

const Guide = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>玉入れ合戦とは？</h1>
      <p>これは、観客一体型の玉入れゲームです。</p>
      <p>通常の玉入れでは、カゴが二つありますが、今回は一つしかありません。</p>
      <p>そのため、攻守交代を挟み、得点を競い合います。</p>
      <p>観客の皆さんは、応援とブーイングによって、ゲームに追加の得点と妨害を加えることができます。</p>
      <br></br>
      <h2>応援するには？</h2>
      <p>トップ画面にて「応援する」ボタンを選択してください</p>
      <p>応援は、カメラを用いた動作解析と、マイクを用いた発話解析の二つを組み合わせて、応援の強度が推定されます。</p>
      <p>声援は、「頑張れ！」「いけ〜！」「いいぞ！」「入れろ！」が反応します。</p>
      <br></br>
      <h2>ブーイングするには？</h2>
      <p>トップ画面にて「ヤジを飛ばす」ボタンを選択してください</p>
      <p>ヤジは、「外せ！」「外れろ！」「やーい」「動け！」「入れるな！」「よけろ！」「いいぞ！」「ぶー！」に反応します。</p>


      <button className='guide_button' style={{backgroundColor: '#555555'}} onClick={() => navigate('/')}>戻る</button>
    </div>
  )
}

export default Guide