// CSS関係
import './css/wireframe.css';
import './css/menu.css';
import './css/general.css';

// 通信関係
import io from "socket.io-client";

// モジュールの読み込み
import GestureRecog from './GestureRecog';
import { useState , useEffect, useRef, useContext } from 'react';
import Meter from './Meter';
import { WordCounter , NegWordCounter} from './ParamsProvider';
import {motion} from 'framer-motion'
import { useNavigate} from 'react-router-dom';
import Versus from './Versus';


// 右上に緑色で現れる通知文
let notifMsg = '試合頑張ってね！'

// 応援ワードが聞こえた際、一時的にtrueに。右上緑色通知のアニメーションが発火
let wordHeard = false
let negWordHeard = false

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
      negWordHeard ?
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

function Support() {
  // 諸々の定義ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

  const [myIndex, setMyIndex] = useState(0) // 自分の盛り上がり指数
  const navigate = useNavigate()

  // wordCount系のパラメータをcontextから読み込む
  const { wordCount, setWordCount } = useContext(WordCounter)
  const { negWordCount, setNegWordCount } = useContext(NegWordCounter)

  // 初回レンダリング時に声援認識をしてしまうのを防ぐためのuseRef
  const renderFlgRef = useRef(false)

  const myIndexRef = useRef(0)
  
  const updateIndex = (num) =>{
    indexBin.splice(0,1);
	  indexBin.push(num);
    setMyIndex(`${indexBin.reduce((a, b) => a + b)}`)
    // console.log(typeof(indexBin))
    return
  }
  

  useEffect(() => {
    updateIndex(50)
	}, [])

  const goBackHome = () =>{
    navigate('/')
    // const res = window.confirm('応援をやめてしまって良いのですか？')
    // if( res == true ) {
    //   navigate('/')
    // }
    // else {
    // }
  }

  // 声援を認識しmyIndexを更新ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  useEffect(() =>{
    if(renderFlgRef.current) {
      const cheerNotify = async () =>{
        updateIndex(50)
        notifMsg = 'ナイス声援！ +50'
        wordHeard = true
        await new Promise(s => setTimeout(s, 2000))
        wordHeard = false
      }
      cheerNotify()
    }else{
      renderFlgRef.current = true
    }
  },[negWordCount])


  // サーバにデータ送信ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 
  // asyncはナシでも動くが、僅かにasyncアリの方がサーバへの転送が早い気がする
  const sendmyindex = async (index) =>{
    await socket.emit("send_myPosiIndex" , index)
  }
  
  const sendStart = async (signal) =>{
    await socket.emit("send_start" , signal)
  }
  
  useEffect(() => {
    myIndexRef.current = myIndex
  },[myIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      sendmyindex(myIndexRef.current)
    }, 200);
    return () => clearInterval(interval);
    // アンマウント時にsetIntervalを解除してくれる
  }, []);
  
  // 画面表示ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  return (
    <div className="App">
      
      <div className="top">
        <Versus />
      </div>

      <div className="bottom ">
        <div className="my_info im_posi bottom_block_margin">
          <div className="my_left_info">
            <p className="bold">あなたの応援</p>
            <GestureRecog updateIndex = {updateIndex} />
          </div>
          <div className="my_right_info">
            <br></br>
            <p>応援メータ</p>
            <Meter index={myIndex} score = {myIndex} />
          </div>
          <div className="message bottom_block_margin">
            <p className="bold">メッセージ</p>
            ゲーム開始と同時に、応援を始めてください。
            <Notification />
          </div>
        </div>

        
      </div>
      

    </div>
  );
}

export default Support;
