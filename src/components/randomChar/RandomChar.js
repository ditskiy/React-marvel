import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServise from '../../services/MarvelServise';

import mjolnir from "../../resources/img/mjolnir.png"

import './randomChar.scss';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
        stil: false,

    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 3000);
    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }
    

    onChatLoaded = (char) => {
        if (!char.description) {
            char.description = "У этого персонажа нету описания";
        } if (char.description.length > 165) {
            char.description = char.description.slice(0, 165) + '...';
        } if (char.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            this.setState({
                stil: true
            })
        } else {
            this.setState({
                stil: false
            })
        }
        this.setState({
            char, 
            loading: false,
        })
    }

    onChatloading = () => {
        this.setState({
            loading: true,
        })
    }

    onError = () => {
        this.setState({ 
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onChatloading();
        this.marvelServise 
            .getCharacters(id)
            .then(this.onChatLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error, stil} = this.state;
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
                        onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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