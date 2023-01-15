import React ,{useContext} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { WordCounter } from './ParamsProvider';


const VoiceRecog = () => {
    const { wordCount, setWordCount } = useContext(WordCounter)

    const {
      transcript,
      listening,
      resetTranscript,
      interimTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    var counts = []
    counts = [...counts,( transcript.match( /頑張れ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /がんばれ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /いけ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /池/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /イケ/g ) || [] ).length ]
  
    
    setWordCount(counts.reduce((sum, element) => sum + element, 0))

    // useEffect(() =>{
    //   updateIndex(50)
    //   // updateIndex(20)
    //   // new Promise(s => setTimeout(s, 2000))
  
    //   const cheerNotify = async () =>{
    //     // wordHeard = true
    //     await new Promise(s => setTimeout(s, 2000))
    //     // wordHeard = false
    //   }
    //   cheerNotify()
    // },[wordCount])
  
    if (!browserSupportsSpeechRecognition) {
      return (
        alert('このブラウザでは音声認識を利用できません。Chromeを使用してください。')
      )
    }
  
  SpeechRecognition.startListening({continuous: true, language: "ja"})
  console.log(`transcript is: ${transcript}`)

  
  
    return (<div></div>)
  };
  export default VoiceRecog;