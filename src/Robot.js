import React, { useState, useEffect, useRef } from 'react'
import './css/robot.css'

// 通信関係
import io from "socket.io-client";

// サーバとの通信設定。.envはlocalと本番でURL切り替わる。
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`)

let allowMove = true

function Robot() {
    const [posiIndex, setPosiIndex] = useState(0)
    const [negIndex, setNegIndex] = useState(0)
    const [speed , setSpeed] = useState(4)

    const speedRef = useRef(1)

    useEffect(() => {
        speedRef.current = speed
    },[speed])


    // サーバにデータを要求ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    //   (クライアントからサーバに receive_params を送ることで、サーバから最新paramsを受信できる)

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

    // サーバからデータを受信ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    useEffect(() => {

        socket.on('posi_index', function(posiIndex){
            setPosiIndex(posiIndex)
        })

        socket.on('neg_index', function(negIndex){
            setNegIndex(negIndex)
        })

        socket.on('speed', function(speed){
            setSpeed(speed)
        })

        return () => {
            socket.off('posi_index');
            socket.off('neg_index');
            socket.off('speed');
        };
    }, []);

    let stopFlag = false;
    

    async function startSerial(allowMove) {
        // if(allowMove){

            try {
                console.log("INFO: 接続が確立しました");
                stopFlag = false;
                const port = await navigator.serial.requestPort();
                await port.open({ baudRate: 115200 });
                while (port.readable) {
                    const reader = port.readable.getReader();
                    const encoder = new TextEncoder();

                    let inputValue = 'req'
                    
                    try {
                        while (!stopFlag) {
                            const { value, done } = await reader.read();
                            if (done) {
                                console.log("INFO: 読込モード終了");
                                break;
                            }
                            if(allowMove){
                                if(inputValue = 'req'){
                                    let uint8Array = new Uint8Array([speedRef.current]);
                                    const writer = port.writable.getWriter();
                                    await writer.write(encoder.encode(uint8Array));
                                    writer.releaseLock();
                                }
    
                                //👇生データはバイナリなので、ユニコード文字へデコード
                                inputValue = await new TextDecoder().decode(value);
                                console.log(inputValue);
                                
                            }else{
                                await port.close
                                console.log('port Closed')
                            }

                        }
                    } catch (error) {
                        console.log("ERROR: 読み出し失敗");
                        console.log(error);
                    } finally {
                        reader.releaseLock();
                        await port.close();
                        console.log("INFO: 接続を切断しました");
                    }
                }
            } catch (error) {
                console.log("ERRORR: ポートが開けません");
                console.log(error);
            }
        // }
    }
    function stopSerial() {
        allowMove = false
        stopFlag = true;
        // allowMove = false
    }

  return (
    <div>
        <h1>かごRobot制御用ページ</h1>
        <p id='center'>ロボット動作中は、このページを閉じないでください</p>
        <div className='guideDiv' >
            <h2>ロボットへの接続方法</h2>
            <p>① ESP32マイコンの電源を入れる。</p>
            <p>② PCのBluetooth接続画面を開く。</p>
            <p>③ ペアリング済み（接続はされていない）場合、ペアリングの記憶を削除。</p>
            <p>　　→マイコンとBT接続する際は、エラー防止のため、毎回記憶をリセットしてから繋ぐこと</p>
            <p>④ PCからBluetooth新規接続を開く。ESP32testとか書かれているデバイスを選択し、接続する。</p>
            <p>⑤ 接続成功しても、多分5秒くらいで接続が切れます。それでOK！ baudRateとかがPCとマイコンで揃ってないのです。</p>
            <p>⑥ 以下の「接続」ボタンを押してください。ESP32的なのを選択してね。</p>
            <p>注意：マイコンのソースコードを書き換えた場合も、必ず①からやり直すこと。</p>
        </div>

        <br></br>
        <button onClick={startSerial}>▶︎ 接 続 ◀︎</button>
        <button onClick={stopSerial}>ロボットとの接続portを切断</button>
        <br></br>
        <div className="guideDiv">
            <h2>各種パラメータ(useState)</h2>
            <p>speed</p>
            <p>{speed}</p>
            <p>negIndex</p>
            <p>{negIndex}</p>
            <p>posiIndex</p>
            <p>{posiIndex}</p>


        </div>

    </div>
  )
}

export default Robot
