import React, { FC, useCallback, useEffect, useRef, useState, VFC } from 'react';
import Webcam from 'react-webcam';
import { css } from '@emotion/css';
import { Camera } from '@mediapipe/camera_utils';
import { Hands, Results } from '@mediapipe/hands';
import { drawCanvas } from './drawCanvas';

const scale = 30; // 取得した手の座標を何倍に拡大して激しさを取得するか？

// 動作認識を記述。
const GestureRecog = (props) => {

	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const resultsRef = useRef()

	let prev_x = 0;    // 前フレームにおける、手のx座標
	let prev_y = 0;
	let pos_x = 0;    // 今のフレームにおける、手のx座標
	let pos_y = 0; 
	let dif_x = 0;    // 前フレームと今のフレームの手のx座標の変位
	let dif_y = 0;
	let distance = 0;    // 前フレームと今のフレームの手の座標の変位

	/**
	 * 検出結果（フレーム毎に呼び出される）
	 * @param results
	 */
	const onResults = useCallback((results) => {
		resultsRef.current = results
		const canvasCtx = canvasRef.current.getContext('2d')
		drawCanvas(canvasCtx, results)
		// OutputData();
		Location();
	}, [])

	// 初期設定
	useEffect(() => {
		const hands = new Hands({
			locateFile: file => {
				return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
			}
		})

		hands.setOptions({
			maxNumHands: 2,
			modelComplexity: 1,
			minDetectionConfidence: 0.5,
			minTrackingConfidence: 0.5
		})

		hands.onResults(onResults)

		if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
			const camera = new Camera(webcamRef.current.video, {
				onFrame: async () => {
					await hands.send({ image: webcamRef.current.video })
				},
				width: 1280,
				height: 720
			})
			camera.start()
		}
	}, [onResults])

	// 手の座標位置を取得し、変数に代入
	const Location = () =>{
		const results = resultsRef.current  
		
		try{
			pos_x = results.multiHandLandmarks[0][20].x * scale
			pos_y = results.multiHandLandmarks[0][20].y * scale
			dif_x = pos_x - prev_x
			dif_y = pos_y - prev_y
			distance = Math.round(Math.sqrt(dif_x*dif_x + dif_y*dif_y))
			// distance = Math.sqrt(dif_x**2 + dif_y**2)
            props.updateIndex(distance)
			
			prev_x = pos_x
			prev_y = pos_y
			// dif_x = 0
			// dif_y = 0
		}catch(error){
			props.updateIndex(0)
		}
	}

// 応援やブーイング画面にて、左下に表示される自分の映像を出すUI部分を以下に記述。
  return (
    <div className={styles.container}>
			{/* capture */}
			<Webcam
				audio={false}
				style={{ visibility: 'hidden' }}
				width={1280}
				height={720}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
			/>
			{/* draw */}
			<canvas ref={canvasRef} className={styles.canvas} width={1280} height={720} />
			{/* output */}
            {/* <h1>write something</h1> */}

			<div className={styles.buttonContainer}>
                {/* <h1>write something</h1> */}
			</div>
		</div>
  )
}

export default GestureRecog

// 応援やブーイング画面にて、左下に表示される自分の映像に適用するCSS。
const styles = {
	container: css`
		position: relative;
		// height: calc(45vh - 27.5px);
		// height: calc(45vh - 52.5px);
		// 下の数字は厳密に算出されたわけではなく、あくまで経験的に確からしい数字
		height: calc(45vh - 57.5px);
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	`,
	canvas: css`
		position: absolute;
		// width: 1280px;
		width: 640px;
		// height: 720px;
		height: 360px;
		background-color: #fff;
	`,
	buttonContainer: css`
		position: absolute;
		top: 0vh;
		left: 1vw;
		font-size: 20px;
	`,
	button: css`
		color: #fff;
		background-color: #0082cf;
		font-size: 1rem;
		border: none;
		border-radius: 5px;
		padding: 10px 10px;
		cursor: pointer;
	`
}