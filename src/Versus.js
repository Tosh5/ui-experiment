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
import { useNavigate} from 'react-router-dom';

// サーバとの通信設定。.envはlocalと本番でURL切り替わる。
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`)

const Versus = () => {

    const [posiIndex, setPosiIndex] = useState(0)
    const [posiScore, setPosiScore] = useState(0)
    const [negIndex, setNegIndex] = useState(0)
    const [negScore, setNegScore] = useState(0)

    const [timeRemain, setTimeRemain] = useState('開始前')
    const navigate = useNavigate()  // ページ遷移用

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

        socket.on('time_remain', function(time_remain){
        setTimeRemain(time_remain)
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
            <div className="current_aveIndex">
            <p className="bold">総合評価</p>
            {/* 瞬間の盛り上がり度 */}
            <Meter index={posiIndex} score = {posiScore}/>
            </div>
            
            <div className="accumulated_aveIndex">
            <p className="bold">累積総合評価</p>
            {/* 全体の盛り上がり度 */}
            <p className='totalIndex'>{posiScore}</p>
            実際に AveGauge を入れてみて、<br></br>サイズを調整したい。
            </div>
            <div className="messages">
            <p className="bold">メッセージ</p>
            
            </div>
        </div>

  </div>

  )
}

export default Versus