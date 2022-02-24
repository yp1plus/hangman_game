import React from 'react';
import wordsDatabase from './br-sem-acentos.txt'

class Hangman extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numberTries: props.tries,
            guessedLetters: new Set(),
            words: [],
            points: 0,
        };
        this.handleGuess = this.handleGuess.bind(this);
        this.goToNextWord = this.goToNextWord.bind(this);
        this.setPoints = this.setPoints.bind(this);
        this.won = this.won.bind(this);
    }

    readFile(){
        fetch(wordsDatabase)
        .then(response => response.text())
        .then(text => {
            const arrayWords = text.split("\n");
            this.setState({
                words: arrayWords.sort(() => Math.random() - 0.5),
            });
      });
    }

    won(){
        return this.state.words.length === 0 || this.generateWordToBeGuessed().join("") === this.state.words[this.state.words.length - 1];
    }

    setPoints(){
        this.setState((st) => ({
            points: st.points + 
                10 * st.numberTries,
        }));
    }

    handleGuess(evt){
        let letter = evt.target.value;

        this.setState((st) => ({
            guessedLetters: st.guessedLetters.add(letter),
            numberTries: st.numberTries - 
                (st.words[st.words.length - 1].includes(letter) ? 0 : 1),
        }));
    }

    goToNextWord(){
        if (this.state.words.length === 0)
            return;
        
        let newWords = this.state.words;
        newWords.pop();

        this.setPoints();

        this.setState({
            numberTries: this.props.tries,
            guessedLetters: new Set(),
            words: newWords,
        });
    }

    generateWordToBeGuessed(){
        return this.state.words[this.state.words.length - 1].split("").map((letter) => (this.state.guessedLetters.has(letter) ? letter : "_")); 
    }

    generateLetters(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
            <button 
                type="button"
                className=
                {!this.state.guessedLetters.has(letter) ? "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    : "bg-blue-500 text-xs leading-tight uppercase rounded shadow-md text-white font-medium py-2.5 px-6 rounded opacity-50 cursor-not-allowed"}
                key = {letter}
                value = {letter}
                onClick = {this.handleGuess}
                disabled = {this.state.guessedLetters.has(letter) || this.state.words.length === 0}
            >
                {letter}
            </button>
        ));
    }

    componentDidMount(){
        this.readFile();
    }

    render(){
        const gameOver = this.state.numberTries === 0;
        

        return (
            <div className = "flex flex-col justify-center items-center">
                <h2 className='font-medium leading-tight text-5xl'> Hangman Game </h2>
                <img class="w-320 p-6 h-auto" src = {this.props.frames[this.props.tries - this.state.numberTries]} alt = "Hangman" />
                {
                    this.state.words.length > 0 ?
                        (gameOver ?
                            <h2 className="font-medium leading-tight text-5xl"> {this.state.words[this.state.words.length - 1]} </h2>
                        :
                        <h2 className="tracking-widest font-medium leading-tight text-5xl">
                            {this.generateWordToBeGuessed()}
                        </h2>)
                    :
                    <h2 class="font-medium leading-tight text-5xl"> Você completou o jogo! </h2>
                }   
                <p className = "p-2">
                    {"Pontuação: " + this.state.points}
                </p>
                <div className="flex space-x-2 justify-center">
                    <div className = "space-x-2 space-y-2 items-center"> {this.generateLetters()} </div>
                </div>
                <h2 className="font-medium leading-tight text-5xl">
                    {gameOver ? "Você Perdeu ):" : ""}
                </h2>
                <div className="flex p-4 space-x-2 justify-center">
                    <button
                        type="button"
                        className=  {(this.won() && this.state.words.length > 0) ? "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        : "bg-blue-500 text-xs leading-tight uppercase rounded shadow-md text-white font-medium py-2.5 px-6 rounded opacity-50 cursor-not-allowed"}
                        onClick = {this.goToNextWord}
                        disabled = {!this.won() || this.state.words.length === 0}
                    >
                        Prosseguir
                    </button>
                </div>
                
                
            </div>
        )

    }
}

export default Hangman;
