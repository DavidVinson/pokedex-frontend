import axios from 'axios';
import { AxiosResponse } from 'axios';
import { UrlParams, ApiDataInterface } from 'customTypes';
import { POKEDEX_API } from 'ConstantVariables/ConstantVariables';

export const getPokemonInfo = async (params: UrlParams): Promise<ApiDataInterface> => {
    const response: AxiosResponse = await axios.get(POKEDEX_API, {
        params: { page: params.pageNum },
    });
    console.log('api response', response.data);
    return response.data;
};
