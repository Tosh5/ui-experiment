import React, { useState, useEffect, useRef } from 'react'
import './css/robot.css'
import { useNavigate } from 'react-router-dom';

// 通信関係
import io from "socket.io-client";

// サーバとの通信設定。.envはlocalと本番でURL切り替わる。
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`)

let allowMove = true

let connected = false

function Robot() {
    const navigate = useNavigate()
    
    const [posiIndex, setPosiIndex] = useState(0)
    const [negIndex, setNegIndex] = useState(0)
    const [speed , setSpeed] = useState(4)
    const [miconInfo , setMiconInfo] = useState('未接続')

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
        connected = true

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

                            // 取得した文字列の先頭の文字を抽出
                            let result = inputValue.replace(/[^0-9]/g, '');
                            result = String(result).slice( 0, 1 ) ;

                            if (!result || result.trim().length == 0) {
                                // resultが空白かNULLなので、処理をスキップ
                            }else{
                                result = Number(result) // string → int
                                setMiconInfo(result)
                            }
                            
                        }else{
                            // ロボットに速度0を送る
                            let uint8Array = new Uint8Array([0]);
                            const writer = port.writable.getWriter();
                            await writer.write(encoder.encode(uint8Array));
                            writer.releaseLock();

                            // 通信portを遮断。ロボットを速度0で停止させる。
                            await port.close
                            console.log('port Closed')
                        }

                    }
                } catch (error) {
                    console.log("ERROR: 読み出し失敗");
                    console.log(error);
                } finally {
                    connected = false
                    reader.releaseLock();
                    await port.close();
                    console.log("INFO: 接続を切断しました");
                }
            }
        } catch (error) {
            connected = false
            console.log("ERRORR: ポートが開けません");
            console.log(error);
        }
    }
    function stopSerial() {
        allowMove = false
        stopFlag = true;
        alert('マイコンとの接続ポートを閉じました。\n再接続するには、緑の「接続」ボタンをクリック。')
    }

  return (
    <div>
        <h1>かごRobot制御用ページ</h1>
        <p id='center'>！ロボット動作中は、このページを閉じないでください！</p>
        {/* ロボットとBluetoothで接続しています。 */}
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
            <p>注意：ロボットとの接続が切れた場合や、下記ボタンで切った場合は、上記⑥をやり直す。</p>
            <p>　　→「ペア設定済み」とか出ても、そのままそれを選択。</p>
            <p>注意：ロボットを使い終わったら、下記【リセット】ボタンを押すこと。</p>
            <p>　　→ブラウザにキャッシュがたまってPCが重くなる。</p>

        </div>

        <br></br>
        {connected ? <h1>接続中</h1> : <h1>接続してね</h1>}
        <button id='startButton' onClick={startSerial}> 　接　 続　 </button>
        <br></br>
        <button onClick={stopSerial}>【一時停止】通信portを切断・コンソールは残す</button>
        <br></br>
        <button id='resetButton' onClick={() => window.location.reload()}>【リセット】通信portを切断・コンソールも削除</button>
        

        
        <br></br>
        <div className="guideDiv">
            <h2>マイコンから受信した情報</h2>
            <p>移動速度</p>
            <p>{miconInfo}</p>
            <h2>サーバから受信した情報</h2>
            <p>speed</p>
            <p>{speed}</p>
            <p>negIndex</p>
            <p>{negIndex}</p>
            <p>posiIndex</p>
            <p>{posiIndex}</p>
        </div>

        <button className='guide_button' style={{backgroundColor: '#555555'}} onClick={() => navigate('/')}>戻る</button>

    </div>
  )
}

export default Robot
