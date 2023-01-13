import React, {useContext, useState, createContext} from 'react' 

export const WordCounter = createContext()

export function WordCountProvider({children}) {
    const [wordCount, setWordCount] = useState(0)
    // const [interim, setInterim] = useState(0)

    const value = {
        wordCount,
        setWordCount,
    }

    return (
        <WordCounter.Provider value = {value} >
            {children}
        </WordCounter.Provider>
    )
}

