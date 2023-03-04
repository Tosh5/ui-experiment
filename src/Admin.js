// CSS関係
// import './css/wireframe.css';
// import './css/menu.css';
// import './css/general.css';
import './css/admin.css';


// 通信関係
import io from "socket.io-client";

// モジュールの読み込み
import { useState, useEffect, useRef, useContext } from 'react';
import Meter from './Meter';
import {motion, useAnimation} from 'framer-motion'
import { BrowserRouter, Route, Switch, Link, useNavigate, unstable_HistoryRouter} from 'react-router-dom';
import Versus from './Versus';
import VersusAdmin from './VersusAdmin';


// 右上に緑色で現れる通知文
let notifMsg = '試合頑張ってね！'

// 応援ワードが聞こえた際、一時的にtrueに。右上緑色通知のアニメーションが発火
let wordHeard = false

// サーバとの通信設定。.envはlocalと本番でURL切り替わる。
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`)

// indexBinの作成と初期化
const binSize = 20 // indexの計算に使われるindexBinの要素数を規定
let indexBin = [...Array(binSize)].map((_, i) => i)
for (var i = 0; i < binSize; i++){
  indexBin[i] = 0;  // 0 で初期化
}

export const Notification = () => (
  <motion.div className='notification'
    style={{ 
      width: 350, height: 80, 
      backgroundColor: '#03bc44', borderRadius: 15,
    }}
    animate={
      wordHeard ?
      { 
        x: [window.innerWidth * 1, 
          window.innerWidth * 0,
          window.innerWidth * 0,
          window.innerWidth * 1]
      }: 
      { 
        x: [window.innerWidth * 1, 
          window.innerWidth * 1,
          window.innerWidth * 1,
          window.innerWidth * 1]
      }
  }
    transition={{
      duration: 2,
      times: [0, 0.15, 0.8, 1]
    }}
  >
  <p className='popupAnimation'>{notifMsg}</p>
  </motion.div>
)

function Admin() {
  // 諸々の定義ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  const [geneIndex, setGeneIndex] = useState(0) // 全体の盛り上がり指数  
  const [totalIndex, setTotalIndex] = useState('0') // 応援累積得点  
  const [timeRemain, setTimeRemain] = useState('開始前')
  const navigate = useNavigate()

  // サーバにデータ送信ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  const sendStart = async (signal) =>{
    await socket.emit("send_start" , signal)
  }

  const resetParams = () =>{
    socket.emit('reset_params')
  }

  // サーバからデータを受信した場合ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  useEffect(() => {
    socket.on('gene_index', function(aveIndex) {
      setGeneIndex(aveIndex)
    })
    
    socket.on('total_index', function(totalIndex){
      setTotalIndex(totalIndex)
    })

    socket.on('time_remain', function(time_remain){
      setTimeRemain(time_remain)
    })

    return () => {
      socket.off('gene_index');
      socket.off('total_index');
      socket.off('time_remain');
    };
  }, []);

  
  // 画面表示ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  return (
    <div className="Admin">
      
      <div className="top">
        <VersusAdmin />
      </div>

      <button onClick={() =>{sendStart()}}>ゲーム開始</button>
      <button onClick={resetParams}>サーバをリセット</button>
      

    </div>
  );
}

export default Admin;
