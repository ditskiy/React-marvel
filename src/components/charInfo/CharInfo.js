import { Component } from 'react';
import MarvelServise from '../../services/MarvelServise';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton";

import './charInfo.scss';

class CharInfo extends Component{
    state = {
        char: null,
        loading: false,
        error: false,
        stil: false

    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }

    }

    updateChar= () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.marvelServise
            .getCharacters(charId)
            .then(this.onChatLoaded)
            .catch(this.onError);
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

    render() {
        const {char, loading, error, stil} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const stile = stil ? {objectFit: "contain"} : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} stile={stile}/> : null;


        return (
            <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
            </div>
        )
    }
}

const View = ({char, stile}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
            <div className="char__basics">
                    <img style={stile} src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : "Sorry. No comics"}
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if (i > 9) return;
                            return (
                                <li key={i} className="char__comics-item">
                                   <a href={item.resourceURI}>{item.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}

export default CharInfo;