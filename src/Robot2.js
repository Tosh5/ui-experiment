import React from 'react'

function Robot2() {
    const button01 = document.getElementById("write01");
    const button02 = document.getElementById("write02");
    // button01.addEventListener("click", function () {writeText('aaa\n');}, false);
    // button02.addEventListener("click", function () {writeText('bbb\n');}, false);

    let port;
    

    async function onStartButtonClick() {
        // const port = await navigator.serial.requestPort();
        // await port.open({ baudRate: 115200 });
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        console.log("接続");
    } catch (e) {
        console.log("Error");
    }
    }

    async function writeText(text) {
    const encoder = new TextEncoder();
    const writer = port.writable.getWriter();
    await writer.write(encoder.encode(text));
    console.log("テキスト書き込み: " + text);
    writer.releaseLock();
    }

    async function sendText(){
        console.log('sendText実行中')
        const encoder = new TextEncoder();
        console.log('TextEncoderをセットしたよ')
        const writer = port.writable.getWriter();
        console.log('3を送るよ！')
        // await writer.write(encoder.encode("3")); // LEDが50回点灯してしまう
        // await writer.write(encoder.encode(3)); // 51回点灯してしまう
        await writer.write(3); 
        writer.releaseLock();


        // console.log('sendText実行中')
        // const writer = port.writable.getWriter();
        // console.log('3を送るよ！')
        // await writer.write(3);
        // console.log('3を送信したよ')
        // writer.releaseLock();
    }

  return (
    <div>
        <p>webSerial</p>
        <button onClick={onStartButtonClick}>接続</button>
        <button id='write01'>書き込み1</button>
        <button id='write02'>書き込み2</button>

        <button onClick={sendText}>書き込みしまーす</button>

    </div>
  )
}

export default Robot2