import React ,{useContext} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { WordCounter,NegWordCounter } from './ParamsProvider';


const VoiceRecog = () => {
    const { wordCount, setWordCount } = useContext(WordCounter)
    const { negWordCount, setNegWordCount } = useContext(NegWordCounter)

    const {
      transcript,
      listening,
      resetTranscript,
      interimTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    console.log(transcript)

    console.log('speech recong in progress')
  
    var counts = []
    counts = [...counts,( transcript.match( /頑張れ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /がんばれ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /いけ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /池/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /イケ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /入れろ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /いれろ/g ) || [] ).length ]
    counts = [...counts,( transcript.match( /いいぞ/g ) || [] ).length ]
  
    setWordCount(counts.reduce((sum, element) => sum + element, 0))


    var negCounts = []
    negCounts = [...negCounts,( transcript.match( /はずせ/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /80/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /パズドラ/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /発令/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /ぶー/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /ブー/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /ブルー/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /下手/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /やい/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /外せ/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /外れろ/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /やーい/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /動け/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /入れるな/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /よけろ/g ) || [] ).length ]
    negCounts = [...negCounts,( transcript.match( /いいぞ/g ) || [] ).length ]
    setNegWordCount(negCounts.reduce((sum, element) => sum + element, 0))

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