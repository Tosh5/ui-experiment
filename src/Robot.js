import React, { useState, useEffect, useRef } from 'react'
import './css/robot.css'

// 通信関係
import io from "socket.io-client";

// サーバとの通信設定。.envはlocalと本番でURL切り替わる。
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`)

let speed3 = 5;

function Robot() {
    const [posiIndex, setPosiIndex] = useState(0)
    const [negIndex, setNegIndex] = useState(0)
    const [speed2, setSpeed2] = useState(5)

    const speedRef = useRef(0)

    useEffect(() => {
        speedRef.current = speed2
      },[speed2])
    

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

    // const sendSpeed = async () =>{
    //     await socket.emit('speed', speed)
    // }

    // サーバからデータを受信ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    useEffect(() => {

        socket.on('posi_index', function(posiIndex){
            setPosiIndex(posiIndex)
        })

        socket.on('neg_index', function(negIndex){
            setNegIndex(negIndex)
        })

        return () => {
            socket.off('posi_index');
            socket.off('neg_index');
        };
    }, []);

    let speed = (negIndex - posiIndex)/20 + 5 // ブーイングと応援のバランス
    if(speed >= 10){
        speed = 10
    }
    if(speed <= 0){
        speed = 0
    }
    speed = Math.floor(speed)




    let stopFlag = false;
    

    let speed3 = speed2
    

    async function startSerial() {
        try {
            console.log("INFO: 接続が確立しました");
            stopFlag = false;
            const port = await navigator.serial.requestPort();
            await port.open({ baudRate: 115200 });
            while (port.readable) {
                const reader = port.readable.getReader();

                const encoder = new TextEncoder();
                // const writer = port.writable.getWriter();

                // let uint8Array = new Uint8Array([speed]);
                // console.log(uint8Array)
                // await writer.write(encoder.encode(uint8Array));
                // writer.releaseLock();


                let inputValue = 'sendMeNextSpeed'
                
                try {
                    while (!stopFlag) {
                        const { value, done } = await reader.read();
                        if (done) {
                            console.log("INFO: 読込モード終了");
                            break;
                        }

                        if(inputValue = 'sendMeNextSpeed'){
                            console.log('↓↓↓speedRef.current')
                            console.log(speedRef.current)
                            let uint8Array = new Uint8Array([speedRef.current]);
                            // console.log('今から出力')
                            // console.log(uint8Array)
                            const writer = port.writable.getWriter();
                            // console.log('start writing now')
                            await writer.write(encoder.encode(uint8Array));
                            await writer.write(encoder.encode(uint8Array));
                            

                            // console.log('wrote just now')
                            writer.releaseLock();
                        }

                        inputValue = 'changed'

                        //👇生データはバイナリなので、ユニコード文字へデコード
                        inputValue = await new TextDecoder().decode(value);
                        console.log(inputValue);
                        console.log('↑ 受信した値')

                        // let uint8Array = new Uint8Array([speed]);
                        // console.log(uint8Array)
                        // await writer.write(encoder.encode(uint8Array));
                        // writer.releaseLock();


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
    }
    function stopSerial() {
        // port.close();
        stopFlag = true;
    }


    // async function sendThree(){
    //     stopFlag = false;
    //     const encoder = new TextEncoder();

    //     const port = await navigator.serial.requestPort();
    //     // await port.open({ baudRate: 115200 });

    //     const writer = port.writable.getWriter();
    //     let uint8Array = new Uint8Array([3]);
    //     console.log('今から3を出力')
    //     console.log(uint8Array)
    //     await writer.write(encoder.encode(uint8Array));
    //     writer.releaseLock();
    // }



    async function sendText(){
        // console.log('sendText実行中')

        // stopFlag = false;
        // // const port = await navigator.serial.requestPort();
        // // await port.open({ baudRate: 115200 });
        // console.log('書き込み用のポートが準備OK')
        
        // const encoder = new TextEncoder();
        // console.log('TextEncoderをセットしたよ')
        // const writer = port.writable.getWriter();
        // console.log('3を送るよ！')
        // // await writer.write(encoder.encode("3")); // LEDが50回点灯してしまう
        // await writer.write(encoder.encode(3)); // 51回点灯してしまう  Base45 で2が変換されると51になる。
        // // await writer.write(3); 
        // writer.releaseLock();
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
        <button onClick={stopSerial}>切断</button>
        <br></br>
        <button 
            onClick={() => setSpeed2(speed2 - 1)}
        >. - .</button>     
        {speed2}    
        <button 
            onClick={() => setSpeed2(speed2 + 1)}
        >. + .</button>
        <input></input>
        {/* <button onClick={sendThree}>3を送ります</button> */}
        <br></br>

        <div className="guideDiv">
            <h2>各種パラメータ(useState)</h2>
            <p>negIndex</p>
            <p>{negIndex}</p>
            <p>posiIndex</p>
            <p>{posiIndex}</p>
            <p>speed</p>
            <p>{speed}</p>

        </div>



    </div>
  )
}

export default Robot



// Robot.js:58 Uncaught (in promise) DOMException: Failed to execute 'open' on 'SerialPort': The port is already open.
//     at sendText (http://localhost:3000/static/js/bundle.js:2164:16)