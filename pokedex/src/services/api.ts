import axios from 'axios';
import { AxiosResponse } from 'axios';
import { UrlParams, ApiDataInterface } from 'customTypes';
import { POKEDEX_API } from 'ConstantVariables/ConstantVariables';

export const getPokemonInfo = async (params: UrlParams): Promise<ApiDataInterface> => {
    const response = await axios.get(POKEDEX_API, {
        params: { page: params.pageNum },
    });
    return response.data;
};
