import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServise from '../../services/MarvelServise';

import mjolnir from "../../resources/img/mjolnir.png"

import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [stil, setStil] = useState(false);

    const marvelServise = new MarvelServise();

    useEffect(() => {
        updateChar();
    }, [])

    // componentDidMount() {
    //     this.updateChar();
    //     // this.timerId = setInterval(this.updateChar, 3000);
    // }
    // componentWillUnmount() {
    //     clearInterval(this.timerId);
    // }
    

    const onChatLoaded = (char) => {
        if (!char.description) {
            char.description = "У этого персонажа нету описания";
        } if (char.description.length > 165) {
            char.description = char.description.slice(0, 165) + '...';
        } if (char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            setStil(true)
        } else {
            setStil(false)
        }
        setChar(char)
        setLoading(false)
    }

    const onChatloading = () => {
        setLoading(true)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onChatloading();
        marvelServise 
            .getCharacters(id)
            .then(onChatLoaded)
            .catch(onError)
    }


    const stile = stil ? {objectFit: "contain"} : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char} stile={stile}/> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner"
                    onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({char, stile}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    return (
        <div className="randomchar__block"> 
            <img style={stile} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Home page</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;