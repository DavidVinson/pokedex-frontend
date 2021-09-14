import axios from 'axios';
import { AxiosResponse } from 'axios';
import { UrlParams, ApiDataInterface } from 'Types';
import { POKEDEX_API } from 'ConstantVariables/ConstantVariables';

export const getPokemonInfo = async (params?: UrlParams): Promise<AxiosResponse<ApiDataInterface>> => {
    return await axios.get(POKEDEX_API, { params: { page: params?.pageNum } });
};

export const findPokemon = async (name: string, pageNum?: string): Promise<AxiosResponse<ApiDataInterface>> => {
    return await axios.get(POKEDEX_API, { params: { name: name, page: pageNum } });
};

export const getPageDetail = async (pokeID: string) => {
    return await axios.get(`${POKEDEX_API}/${pokeID}`);
};

export const getPage = async (
    page: string,
    pageNum: string,
    pokemonNameSearch: string,
): Promise<AxiosResponse<ApiDataInterface>> => {
    if (pokemonNameSearch) {
        const response = await axios.get(POKEDEX_API, {
            params: { name: pokemonNameSearch, page: pageNum },
        });
        return response;
    } else {
        const response = await axios.get(page);
        return response;
    }
};
