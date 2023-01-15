import React, {useContext, useState, createContext} from 'react' 

export const WordCounter = createContext()
export const NegWordCounter = createContext()


export function WordCountProvider({children}) {
    const [wordCount, setWordCount] = useState(0)
    const [negWordCount, setNegWordCount] = useState(0)

    const value = {
        wordCount,
        setWordCount,
    }

    const negValue = {
        negWordCount,
        setNegWordCount
    }

    return (
        <WordCounter.Provider value = {value} >
            <NegWordCounter.Provider negValue = {negValue}>
                {children}
            </NegWordCounter.Provider>
        </WordCounter.Provider>
    )
}

