import './charList.scss';
import { Component } from 'react';
import MarvelServise from '../../services/MarvelServise';






class CharList extends Component {
    state = {
        chars: []
    }

    marvelServise = new MarvelServise();

    componentDidMount() {
        this.updateChars();
    }

    onChatsLoaded = (chars) => {
        this.setState({chars})
    }

    updateChars = () => {
        this.marvelServise
            .getAllCharacters()
            .then(this.onChatsLoaded)
    }


   
    render() {
        const {chars} = this.state;
        return (
            <div className="char__list">
                <ul className="char__grid">
                {chars.map(char => (
                    <li key={char.id} onClick={() => this.props.onCharSelected(char.id)} className="char__item">
                        <img src={char.thumbnail} alt={char.name} />
                        <div className="char__name">{char.name}</div>
                    </li>
                ))}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;