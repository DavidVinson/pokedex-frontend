import axios from 'axios';
import { AxiosResponse } from 'axios';
import { UrlParams, ApiDataInterface } from 'customTypes';
import { POKEDEX_API } from 'ConstantVariables/ConstantVariables';

export const getPokemonInfo = async (params: UrlParams): Promise<AxiosResponse<ApiDataInterface>> => {
    const response = await axios.get(POKEDEX_API, {
        params: { page: params.pageNum },
    });
    return response;
};

export const findPokemon = async (name: string, pageNum?: string): Promise<AxiosResponse<ApiDataInterface>> => {
    const response = await axios.get(POKEDEX_API, {
        params: { name: name, page: pageNum },
    });
    return response;
};

export const getPageDetail = async (pokeID: string) => {
    const response = await axios.get(`${POKEDEX_API}/${pokeID}`);
    return response;
};

export const nextPage = async (
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
