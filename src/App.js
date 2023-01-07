import './css/wireframe.css';
import './css/menu.css';
import './css/general.css';


function App() {
  return (
    <div className="App">
      <div className="top ">
        <div className="menu top_block">
          <div className="timer">
            3:00
          </div>
          <div className="participants">
            <p className='bold'>参加者数</p>
            <p className='small'>攻撃側：</p>            
            <p className='small'>防御側：</p>
          </div>

          <div className="mode_selector">
            <p className='current_mode'>応援モード</p>
            <button onClick={() =>{window.confirm('応援をやめてしまって良いのですか？')}}>終了する</button>
          </div>
        </div>
        <div className="general top_block">
          <div className="current_aveIndex">
            <p className="bold">全体の盛り上がり度</p>
            {/* AveGauge */}
          </div>
          <div className="accumulated_aveIndex">
            <p className="bold">累積盛り上がり度</p>
            <p>53</p>
            実際に AveGauge を入れてみて、<br></br>サイズを調整したい。
          </div>
          <div className="messages">
            <p className="bold">メッセージ</p>
          </div>
          
          
        </div>
      </div>

      <div className="bottom ">
        <div className="my_info bottom_block">
          <div className="my_left_info">
            <p className="bold">あなたの応援</p>
            {/* <YourImage /> */}
          </div>
          <div className="my_right_info">
            <p>応援メータ</p>
            {/* <MyGauge /> */}
          </div>
        </div>

        <div className="opponent bottom_block">
          <p className="bold">敵の応援</p>
        </div>
      </div>
      

    </div>
  );
}

export default App;
