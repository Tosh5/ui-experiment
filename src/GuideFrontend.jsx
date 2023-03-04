
// import React from 'react'
// // import './css/top.css'
// import { useNavigate } from 'react-router-dom';
// import processor from 'processor';

// const GuideFrontend = () => {
// //   const navigate = useNavigate()

//     const MarkDown = `
//     # 必要な基礎知識
// - HTML（一通り）
// - CSS（CSSとは何か？レベルの理解）
// - JavaScript（JSとは何か？レベルの理解）
// - **React**

// フロントエンドの方が複雑です。
// 上記の基礎知識をざっくりと持っている状態でないと、なかなかコードの理解が進まないかもしれません。

// 特に、**React** は超重要です。 

// - Reactのコンポーネントとは、機能と表示を組み合わせたものであること。
// - propsとは何か？
// - React hooks(useState、useEffect）
// - `${}`で変数を文字列化できるというTips
// だけは、**マストで理解**して下記を進めてください。意味不明に終わると思います。

// - useRefの応用的使い方
// - useContextとは？
// - Socket.io （とWebSocketに関する理解）
// - react-router-dom
// についても、一部登場してきますが、必要に応じて都度調べる形で良いと思います。


// # 各コンポーネントの説明

// まず、本システムではReact-router-domを使用しています。
// （わからなくても何となくの理解で読み進めてOKです）

// URLに応じて、設定されたコンポーネントが読み込まれます。
// どのURLに対してどのこのコンポーネントが読み込まれるかは、
// App.js
// に記載があります。

// また、ご存知の通り、コンポーネントの中にコンポーネントを入れることができます。
// 本システムももれなくその通りです。

// 世間でよく、オブジェクト指向とか呼ばれるやつです。

// ## 使い回しているコンポーネント
// Versus.js
// に記載のVersusコンポーネントは、「応援モード」「ブーイングモード」に共通して画面上部に表示されている、応援とブーイングの合計得点を示しています。

// ![](https://storage.googleapis.com/zenn-user-upload/4cd999ef0e75-20230227.png)

// このコンポーネントは、
// /support　（→応援モード）
// /neg　（→ブーイングモード）
// の両方のURLにおいて、使用されていることが確認できると思います。

// ## UIから理解する
// さて、トップページから順に、どこに何のコンポーネントが使用されているのかを説明します。

// ## /　（Top）
// こちらのTopディレクトリは、システムのTopページを示しています。
// ![](https://storage.googleapis.com/zenn-user-upload/b45c3167a843-20230227.png)
// */を開いた応援画面*

// ボタンが4つあります。
// ユーザーがメインで使用する想定なのは、真ん中の2つだけです。
// ![](https://storage.googleapis.com/zenn-user-upload/2ca765f42b8c-20230227.jpeg)
// *クリックすると、どのコンポーネントが表示されるかを追記*

// ## /support  /neg
// 「応援する」を押すと、URLが
// /support
// に変わるのがわかると思います。

// 逆に、「ヤジを飛ばす」を押すと、URLが
// /neg
// に飛ぶのがわかると思います。

// 全て、react-router-domが頑張ってくれています。


// ## /support
// ![](https://storage.googleapis.com/zenn-user-upload/7906cbcb7eac-20230227.jpeg)
// */supportを開いた応援画面*

// では、/support を開いてください。
// ソースコードとしては、Support.js が対応しています。

// Reactのコードを勉強していただくとわかると思うのですが、
// 一つ一つの .js ファイルは、
// - 上の方に、いろんなライブラリなどのimport
// - 続いて、画面の裏側で動かす関数の定義。通信関係や、ボタンをクリックした際の処理など
// - return() の内部に、画面に実際に出力する表示に関わる部分（JSX表記）
// がなされています。

// 理解する上では、先にreturn() 内部を見た方がわかりやすいでしょう。

// #### ソースコード全体

// ```JavaScript: Support.js
//   // 画面表示ーーーーーーーーーーーーー
//   return (
//     <div className="App">
      
//       <div className="top">
//         <Versus />
//       </div>

//       <div className="bottom ">
//         <div className="my_info im_posi bottom_block_margin">
//           <div className="my_left_info">
//             <p className="bold">あなたの応援</p>
//             <GestureRecog updateIndex = {updateIndex} />
//           </div>
//           <div className="my_right_info">
//             <br></br>
//             <p>応援メータ</p>
//             <Meter index={myIndex} score = {myIndex} />
//           </div>
//           <div className="message bottom_block_margin">
//             <p className="bold">メッセージ</p>
//             ゲーム開始と同時に、応援を始めてください。
//             <Notification />
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
//   ```

// #### 画面と対応するコンポーネント
// return内部では、
// 画面UI上部を占めている、Versus
// ![](https://storage.googleapis.com/zenn-user-upload/25213fd3c799-20230227.png)
// と、画面下部を占めているその他の部分があります。

// Versusについては、
// ```JavaScript
// <div className="top">
//     <Versus />
// </div>
// ```
// でコンポーネントが読み込みされていますね。

// #### コンポーネントの読み込み
// そして、この<Versus />は、Support.jsの上部を探すと、
// ```js
// import Versus from './Versus';
// ```
// として別ファイルからimportされているのがわかると思います。

// #### クラスとCSSの読み込み
// また、
// ```
// className="top"
// ```
// の意味合いですが、これは top というHTML上のクラスをつけた上で、CSSにてデザインの詳細な指定を行なっています。

// ようするに、画面の中で左から何Px、右から何Px、文字の大きさは、、文字の太さは、、、
// みたいなことを定義しているわけです。

// そのCSSのファイルも、同様にSupport.jsの上部で読み込みされていると思います。

// ```js
// // CSS関係
// import './css/wireframe.css';
// import './css/menu.css';
// import './css/general.css';
// ```
// ↑こちらですね。

// #### その他、読み込みしているコンポーネント
// ```js
// <GestureRecog updateIndex = {updateIndex} />

// <Meter index={myIndex} score = {myIndex} />

// <Notification />
// ```
// の3つのコンポーネントが同じように読み込みされているのが理解できるかと思います。

// これは重要です。
// 逆に、それ以外の部分の記述は、画面上の細かい補助的な要素にすぎません。

// さて、ここまで<Support />というコンポーネントの構成について説明してきました。
// <Neg /> も概ね同じです。

// このあとは、先述の
// <GestureRecog />から順に、コンポーネントの中身を覗いてみましょう。


// ## GestureRecogについて （MediaPipe：動作認識部）
// ![](https://storage.googleapis.com/zenn-user-upload/7906cbcb7eac-20230227.jpeg)
// */supportを開いた応援画面*

// MediaPipeを使用した動作認識に関する重要な部分です。

// Propsとして、
// ```
// props.updateIndex
// ```
// が渡されています。
// ※propsがわからなければ、必ず調べてください！

// 今回は、updateIndexと名付けたpropsを使用しています。要するに、今の手の動きの激しさ（index)を更新する関数です。
// 関数をpropsで渡しているのですね。

// 子コンポーネントから親コンポーネントに値を渡す上では、割とメジャーなやり方ではないかと思います。
// わからなければ、必ず理解した方が良いです。


// ```js: GestureRecog.js
// import React, { FC, useCallback, useEffect, useRef, useState, VFC } from 'react';
// import Webcam from 'react-webcam';
// import { css } from '@emotion/css';
// import { Camera } from '@mediapipe/camera_utils';
// import { Hands, Results } from '@mediapipe/hands';
// import { drawCanvas } from './drawCanvas';

// const scale = 30; // 取得した手の座標を何倍に拡大して激しさを取得するか？

// // 動作認識を記述。
// const GestureRecog = (props) => {

// 	const webcamRef = useRef(null)
// 	const canvasRef = useRef(null)
// 	const resultsRef = useRef()

// 	let prev_x = 0;    // 前フレームにおける、手のx座標
// 	let prev_y = 0;
// 	let pos_x = 0;    // 今のフレームにおける、手のx座標
// 	let pos_y = 0; 
// 	let dif_x = 0;    // 前フレームと今のフレームの手のx座標の変位
// 	let dif_y = 0;
// 	let distance = 0;    // 前フレームと今のフレームの手の座標の変位

// 	/**
// 	 * 検出結果（フレーム毎に呼び出される）
// 	 * @param results
// 	 */
// 	const onResults = useCallback((results) => {
// 		resultsRef.current = results
// 		const canvasCtx = canvasRef.current.getContext('2d')
// 		drawCanvas(canvasCtx, results)
// 		// OutputData();
// 		Location();
// 	}, [])

// 	// 初期設定
// 	useEffect(() => {
// 		const hands = new Hands({
// 			locateFile: file => {
// 				return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
// 			}
// 		})

// 		hands.setOptions({
// 			maxNumHands: 2,
// 			modelComplexity: 1,
// 			minDetectionConfidence: 0.5,
// 			minTrackingConfidence: 0.5
// 		})

// 		hands.onResults(onResults)

// 		if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
// 			const camera = new Camera(webcamRef.current.video, {
// 				onFrame: async () => {
// 					await hands.send({ image: webcamRef.current.video })
// 				},
// 				width: 1280,
// 				height: 720
// 			})
// 			camera.start()
// 		}
// 	}, [onResults])

// 	// 手の座標位置を取得し、変数に代入
// 	const Location = () =>{
// 		const results = resultsRef.current  
		
// 		try{
// 			pos_x = results.multiHandLandmarks[0][20].x * scale
// 			pos_y = results.multiHandLandmarks[0][20].y * scale
// 			dif_x = pos_x - prev_x
// 			dif_y = pos_y - prev_y
// 			distance = Math.round(Math.sqrt(dif_x*dif_x + dif_y*dif_y))
// 			// distance = Math.sqrt(dif_x**2 + dif_y**2)
//             props.updateIndex(distance)
			
// 			prev_x = pos_x
// 			prev_y = pos_y
// 			// dif_x = 0
// 			// dif_y = 0
// 		}catch(error){
// 			props.updateIndex(0)
// 		}
// 	}

// // 応援やブーイング画面にて、左下に表示される自分の映像を出すUI部分を以下に記述。
//   return (
//     <div className={styles.container}>
// 			{/* capture */}
// 			<Webcam
// 				audio={false}
// 				style={{ visibility: 'hidden' }}
// 				width={1280}
// 				height={720}
// 				ref={webcamRef}
// 				screenshotFormat="image/jpeg"
// 				videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
// 			/>
// 			{/* draw */}
// 			<canvas ref={canvasRef} className={styles.canvas} width={1280} height={720} />
// 			{/* output */}
//             {/* <h1>write something</h1> */}

// 			<div className={styles.buttonContainer}>
//                 {/* <h1>write something</h1> */}
// 			</div>
// 		</div>
//   )
// }

// export default GestureRecog

// // 応援やブーイング画面にて、左下に表示される自分の映像に適用するCSS。
// const styles = {
// 	container: css`
// 		position: relative;
// 		// height: calc(45vh - 27.5px);
// 		// height: calc(45vh - 52.5px);
// 		// 下の数字は厳密に算出されたわけではなく、あくまで経験的に確からしい数字
// 		height: calc(45vh - 57.5px);
// 		overflow: hidden;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		border-radius: 10px;
// 	`,
// 	canvas: css`
// 		position: absolute;
// 		// width: 1280px;
// 		width: 640px;
// 		// height: 720px;
// 		height: 360px;
// 		background-color: #fff;
// 	`,
// 	buttonContainer: css`
// 		position: absolute;
// 		top: 0vh;
// 		left: 1vw;
// 		font-size: 20px;
// 	`,
// 	button: css`
// 		color: #fff;
// 		background-color: #0082cf;
// 		font-size: 1rem;
// 		border: none;
// 		border-radius: 5px;
// 		padding: 10px 10px;
// 		cursor: pointer;
// 	`
// }
// ```

// 先ほどよりも難易度が上がったと思います。

// やっていることを日本語で解説すると、
// - webcamを読み込み
// - 毎フレームごとに、取得できた画像をMediaPipeを通して、手の座標を取得する。
// - その座標について、前フレームとの差を、三平方の定理より算出
// - それを変数に突っ込む、
// - webcamから取得した映像を画面に出力
// - その映像に、手の骨格を重ね合わせて表示

// みたいなことをやっています。
// **全部理解する必要はない**と思います。

// いじるとすれば、

// ```js
// const scale = 30; // 取得した手の座標を何倍に拡大して激しさを取得するか？
// ```
// か、
// ```js
// pos_x = results.multiHandLandmarks[0][20].x * scale
// pos_y = results.multiHandLandmarks[0][20].y * scale
// ```
// だと思います。後者は、手の座標のうち、小指の指先を指定しています。

// 体の別の部位を認識させるなら、ここを変更ですね！


// ## Meterコンポーネントについて
// ゲージのメーターの表示に関わるコンポーネントです。
// ![](https://storage.googleapis.com/zenn-user-upload/a45146e1b685-20230227.png)

// メーターに表示する数字をいじりたい場合は、読んで理解してください。

// コンポーネントの外部から与えてあげる必要がある変数（props）として、
// indexとscoreという二つのpropsを受け付けています。

// → indexは、リアルタイムな応援盛り上がり指数（index）。ゲージの周りのバーで表示。
// → scoreは、indexが積分されたもの。累積盛り上がり指数。ゲージの中央にアラビア数字で表示。

// /Support
// /Neg 
// の画面下部のメータでは、indexもsupportも、同じ数字をpropsとして渡しています。

// しかし、Versusコンポーネント（画面上部の大きなメーター）では、indexとsupportに違う数字を流し込んでいます。

// ## Notificationコンポーネントと音声認識

// 元々、いろいろな通知に使用できる用に作っていましたが、
// 結局は音声認識結果を表示する用途にしか使っていません。

// 「頑張れ」「外せ」とかいうと、右からニュイっと通知が出ます。

// こちらは、**他のコンポーネントとは異なり、
// Support.jsやNeg.js内部に、直接記述している**コンポーネントです。

// ```js:Notificationコンポーネント
// export const Notification = () => (
//   <motion.div className='notification'
//     style={{ 
//       width: 350, height: 80, 
//       backgroundColor: '#03bc44', borderRadius: 15,
//     }}
//     animate={
//       wordHeard ?
//       { 
//         x: [window.innerWidth * 1, 
//           window.innerWidth * 0,
//           window.innerWidth * 0,
//           window.innerWidth * 1]
//       }: 
//       { 
//         x: [window.innerWidth * 1, 
//           window.innerWidth * 1,
//           window.innerWidth * 1,
//           window.innerWidth * 1]
//       }
//   }
//     transition={{
//       duration: 2,
//       times: [0, 0.15, 0.8, 1]
//     }}
//   >
//   <p className='popupAnimation'>{notifMsg}</p>
//   </motion.div>
// )
// ```
// framer-motion というReactのライブラリを使用して、
// 右からLINEっぽい緑色のメッセージ文をアニメーション表示させています。

// ```js
// {notifMsg}
// ```
// という変数で、表示する文字を指定しています。

// さて、
// VoiceRecog.js
// という別のファイルの説明を軽くします。

// そのコンポーネントでは、常にマイクから音声を取得し、音声認識を走らせています。

// 音声認識結果はtranscriptと名付けられた変数に文字列として格納されており、その中に含まれる応援ワードの数をwordCountに書き込んでいます。

// wordCountという変数は、ParamsProvider.jsにて、Contextとしてプログラム全体からアクセスできるようになっています。

// そのwordCount変数を、Support.jsやNeg.jsでは読み込んでおり、
// その数字が変化したタイミングをuseEffectを使って検知しています。


// ```js
// // 声援を認識しwordHeardとmyIndexを更新ーーーーーーーーーーーーーーーー
// useEffect(() =>{
//   if(renderFlgRef.current) {
//     const cheerNotify = async () =>{
//       // console.log('頑張れdetected')
//       updateIndex(50)
//       notifMsg = 'ナイス声援！ +50'
//       wordHeard = true
//       await new Promise(s => setTimeout(s, 2000))
//       wordHeard = false
//     }
//     cheerNotify()
//   }else{
//     renderFlgRef.current = true
//   }
// },[wordCount])
// ```

// 察しの良い方ならば、この方法には問題があることにお気づきかと思いますが、プログラムをシンプルに書くために、このようにしました。

// 一応、問題点を指摘しておくと、
// 認識結果の文字列を格納するtransactionは、音声認識の結果、文脈を考慮して常に書き換えられます。

// そのため、
// 最初に
// trancation = "ガンバレ、ガンパレ。”
// だったとしても、
// 後から認識結果の修正として
// trancation = "ガンバレ、ガンバレ。”
// のように、パ→バ と認識結果の修正が入ることがあります。

// こうした挙動の影響で、応援者が一切何も話していないタイミングでも、その少し前に話していた音声認識の結果を、システムが再構成して、transactionの中身を書き換えることがあります。

// 要するにバグを含んでいるのですが、
// まあ、バグで得点が入ったらご愛嬌ということにしておいてください。笑

// ## Chromeのコンソール
// 適宜、ブラウザのコンソールにコメントを吐き出すようにしています。

// 特に、音声認識の結果については、
// ![](https://storage.googleapis.com/zenn-user-upload/03ae8e48cde7-20230227.png)
// *コンソールに音声認識結果が出力される*

// 画面右側のコンソールに
// transcript is: 
// の形で出力されていると思います。

// transcriptの文字列が書き換わるたびに、随時コンソールに出力されます。

// サイトにアクセスしてからしばらく経つと、ブラウザが重くなってくるのか、音声認識の反応が鈍くなることがあります。その際は、コンソールを確認してください。

// 大抵の場合、Ctrl+Shift+R でハード再読み込みをすれば、直ります。

// また開発の際に、コンソールを活用することで、どこにバグがあるかを確認しやすくなります。おすすめです。

// ## .envファイルについて
// 本システムでは、.env と .env.development の2種類の環境設定ファイルを使用しています。
// ローカルで作業する際には、バックエンドサーバをローカルで立ち上げる方が開発しやすいと思います。一方、クライアントを本番環境にデプロイした際は、接続するバックエンドサーバはRender.comにデプロイされたものでなければいけません。

// ## サーバに接続できない？
// - PORT番号が適切か？
// - .envファイルなどの記述は正しい？
// - サーバがそもそも立ち上がっている？
// あたりを確認すると良さそうです。


// # 通信に関して
// 本システムではWebSocket通信を使用し、
// クライアント⇄サーバ
// の通信を実現しています。

// WebSocketについては概要を別途調べていただきたいのですが、

// ```js
// socket.emit("通信名",{送りたいデータ});
// ```
// という形式が基本です。

// 通信の理解をするためには、まずはサーバのプログラムから見るのが良いと思います。
// フロントは、画面UIの記述の中に通信も混ざっているので、フロントから理解するのはやりにくいかもしれません。

// ## クライアント→サーバ

// ### 応援画面から
// 応援モード(/support)とブーイングモード（/neg)のそれぞれの画面を開いている間に、
// 「send_myPosiIndex」「send_myNegIndex」が200msごとにサーバに送られます。

// ```js:Support.jsから抜粋
//   const sendmyindex = async (index) =>{
//     await socket.emit("send_myPosiIndex" , index)
//   }
  
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
//   ```


// ### 管理画面（/admin）から
// 管理画面中央の2つのボタンを触ると、以下の関数が発火します。

// ```JavaScript:Admin.jsから抜粋
//   const sendStart = async (signal) =>{
//     await socket.emit("send_start" , signal)
//   }

//   const resetParams = () =>{
//     socket.emit('reset_params')
//   }
// ```

// ## サーバ→クライアント
// サーバから受信する情報は、Versusコンポーネントのみで取り扱われています。

// VersusコンポーネントはSupport、Neg、Adminコンポーネントの子コンポーネントとして扱われているため、実質的にさまざまな画面での画面上部の表示には困りません。

// \\```JavaScript:Versus.jsより
//     useEffect(() => {

//         socket.on('posi_index', function(posiIndex){
//             console.log('received posi_index')
//             setPosiIndex(posiIndex)
//         })

//         socket.on('posi_score', function(posiScore){
//             setPosiScore(posiScore)
//         })

//         socket.on('neg_index', function(negIndex){
//             setNegIndex(negIndex)
//         })

//         socket.on('neg_score', function(negScore){
//             setNegScore(negScore)
//         })

//         socket.on('time_remain', function(timeRemain){
//         setTimeRemain(timeRemain)
//         })

//         return () => {
//             socket.off('posi_index');
//             socket.off('posi_score');
//             socket.off('neg_index');
//             socket.off('neg_score');
//             socket.off('time_remain');
//         };
//     }, []);
// ```

// サーバから受信した値は、それぞれ変数に突っ込まれ、Versus内の2つのゲージと中央の残り時間表示に使用されます。


// # 終わりに
// 以上で、思いつく限りのドキュメントを残しました。

// 細かい実装については、コメントアウトもご確認ください。

// また、各論のコードではなく、システム全体の通信の設計などに関しては、卒論本文に記載がありますので、そちらも併読ください。


// `


//   return (
//     <div>

    
    
//     {/* <button className='guide_button' style={{backgroundColor: '#555555'}} onClick={() => navigate('/')}>戻る</button> */}
//     </div>  
//   )
// }

// export default GuideFrontend

