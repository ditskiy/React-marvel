class MarvelServise {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apikey = "apikey=1ccc479a89b69708d3f681a9af3ce862";


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apikey}`);
    }

    getCharacters = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apikey}`);
    }
}


export default MarvelServise;