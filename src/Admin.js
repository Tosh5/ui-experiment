// CSS関係
import './css/wireframe.css';
import './css/menu.css';
import './css/general.css';

// 通信関係
import io from "socket.io-client";

// モジュールの読み込み
// import GestureRecog from './GestureRecog';
import { useState, useEffect, useRef, useContext } from 'react';
import Meter from './Meter';
// import { WordCounter } from './ParamsProvider';
import {motion, useAnimation} from 'framer-motion'
import { BrowserRouter, Route, Switch, Link, useNavigate, unstable_HistoryRouter} from 'react-router-dom';


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

  


  

  // 声援を認識しmyIndexを更新ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



  // サーバにデータ送信ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 
  // asyncはナシでも動くが、僅かにasyncアリの方がサーバへの転送が早い気がする
//   const sendmyindex = async (index) =>{
//     await socket.emit("send_myindex" , 'support',  index)
//   }
  
  const sentStart = async (signal) =>{
    await socket.emit("send_start" , signal)
  }
  
//   useEffect(() => {
//     myIndexRef.current = myIndex
//   },[myIndex])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       sendmyindex(myIndexRef.current)
//     }, 200);
//     return () => clearInterval(interval);
//     // アンマウント時にsetIntervalを解除してくれる
//   }, []);


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
    <div className="App">
      
      <div className="top">
        <div className="menu top_block">
            <p>残り時間</p>
          <div className="timer">
            {timeRemain}
          </div>
          <div className="participants">
            <p className='bold'>参加者数</p>
            <p className='small'>攻撃側：</p>            
            <p className='small'>防御側：</p>
          </div>

          <button onClick={() =>{sentStart()}}>ゲーム開始</button>

          <div className="mode_selector">
            <p className='current_mode'>応援モード</p>
            <button onClick={() =>{navigate('/')}}>終了する</button>
          </div>
        </div>
        <div className="general top_block">
        
          <div className="current_aveIndex">
            <p className="bold">総合評価</p>
            {/* 瞬間の盛り上がり度 */}
            <Meter index={geneIndex} score = {totalIndex}/>
          </div>
          
          <div className="accumulated_aveIndex">
            <p className="bold">累積総合評価</p>
            {/* 全体の盛り上がり度 */}
            <p className='totalIndex'>{totalIndex}</p>
            実際に AveGauge を入れてみて、<br></br>サイズを調整したい。
          </div>
          {/* <Notification /> */}
          <div className="messages">
            <p className="bold">メッセージ</p>
            <Notification />
          </div>
        </div>
      </div>
{/* 
      <div className="bottom ">
        <div className="my_info bottom_block">
          <div className="my_left_info">
            <p className="bold">あなたの応援</p>
            <GestureRecog updateIndex = {updateIndex} />
          </div>
          <div className="my_right_info">
            <p>応援メータ</p>
            <Meter index={myIndex} score = {myIndex} />
          </div>
        </div>

        <div className="opponent bottom_block">
          <p className="bold">敵のヤジ</p>
        </div>
      </div> */}
      

    </div>
  );
}

export default Admin;
