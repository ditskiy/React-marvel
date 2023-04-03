class MarvelServise {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apikey = "apikey=1ccc479a89b69708d3f681a9af3ce862";
    _baseOffset = 210;


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apikey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacters = async (id) => {
       const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apikey}`);
       return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
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
}


export default MarvelServise;