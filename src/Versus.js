// CSS関係
// import './css/wireframe.css';
// import './css/menu.css';
// import './css/general.css';

// 通信関係
import io from "socket.io-client";

// モジュールの読み込み
import React from 'react'
import GestureRecog from './GestureRecog';
import { useState , useEffect, useRef, useContext } from 'react';
import Meter from './Meter';
import { WordCounter } from './ParamsProvider';
import {motion} from 'framer-motion'
import { Link, NavLink, useNavigate} from 'react-router-dom';

// サーバとの通信設定。.envはlocalと本番でURL切り替わる。
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`)

const Versus = () => {

    const [posiIndex, setPosiIndex] = useState(0)
    const [posiScore, setPosiScore] = useState(0)
    const [negIndex, setNegIndex] = useState(0)
    const [negScore, setNegScore] = useState(0)

    const [timeRemain, setTimeRemain] = useState('2:00')
    const navigate = useNavigate()  // ページ遷移用

    const toHome = () =>{

    }

    // サーバにデータ送信ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 
    const sendmyindex = async () =>{
        await socket.emit('receive_params') 
    }

    useEffect(() => {
        const interval = setInterval(() => {
        sendmyindex()
        }, 10);
        return () => clearInterval(interval);
        // アンマウント時にsetIntervalを解除してくれる
    }, []);

    // サーバからデータを受信した場合ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    useEffect(() => {

        socket.on('posi_index', function(posiIndex){
            console.log('received posi_index')
            setPosiIndex(posiIndex)
        })

        socket.on('posi_score', function(posiScore){
            setPosiScore(posiScore)
        })

        socket.on('neg_index', function(negIndex){
            setNegIndex(negIndex)
        })

        socket.on('neg_score', function(negScore){
            setNegScore(negScore)
        })

        socket.on('time_remain', function(timeRemain){
        setTimeRemain(timeRemain)
        })

        return () => {
            socket.off('posi_index');
            socket.off('posi_score');
            socket.off('neg_index');
            socket.off('neg_score');
            socket.off('time_remain');
        };
    }, []);

    

  return (
    <div>
        <div className="general top_block">
            <div className="score_board red" >
            <p className="bold red_text" onClick={() => navigate('/support')}>応援側</p>
            <Meter index={posiIndex} score = {posiScore}/>
            </div>

            <div className="accumulated_aveIndex">
            <h1 className="title_top">サポーター対決</h1>
            <br></br>
            <h1>VS</h1>
            <br></br>
            <p>残り時間</p>
            <div className="timer">
                {timeRemain}
            </div>
            <br></br>
            <p onClick={() => navigate('/')} 
                style={{
                        cursor: 'pointer',
                        backgroundColor: 'gray',
                        width: '7vw',
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        borderRadius: '7px'
                        }}>Home</p>
            
            
            </div>
            
            <div className="score_board blue">
            <p className="bold blue_text" onClick={() => navigate('/neg')} >妨害側</p>
            <Meter index={negIndex} score = {negScore}/>
            </div>

           
        </div>

  </div>

  )
}

export default Versus