import { useHttp } from "../hooks/http.hook";

const useMarvelServise = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apikey = "apikey=1ccc479a89b69708d3f681a9af3ce862";
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformComics)
    }

    const getCharacters = async (id) => {
       const res = await request(`${_apiBase}characters/${id}?${_apikey}`);
       return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items,
        }
    }

    const _transformComics = (comics) => {
        return {
            title: comics.title,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            price: comics.prices[0].price,
            id: comics.id,
        }
    }


    return {loading, error, getAllCharacters, getCharacters, clearError, getAllComics}
}


export default useMarvelServise;