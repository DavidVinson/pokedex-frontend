export interface HeaderPropsInterface {
    title: string;
}

export interface ApiDataInterface {
    data: {
        data: string[];
        links: string;
        meta: string;
    };
}

export interface DataInterface {
    id: string;
    image: string;
    name: string;
    types: string[];
}

export interface LinksInterface {
    id: string;
    image: string;
    name: string;
    types: string[];
}

export interface MetaInterface {
    current_page: string;
    from: string;
    last_page: string;
    path: string;
    per_page: string;
    to: string;
    total: string;
}

export interface PokemonDetailInterface {
    id: string;
    name: string;
    image: string;
    types: string[];
    height: string;
    weight: string;
    abilities: string[];
    egg_groups: string[];
    stats: {
        hp: string;
        speed: string;
        attack: string;
        defense: string;
        'special-attack': string;
        'special-defense': string;
    };
    genus: string;
    description: string;
}

export interface PokemonListInterface {
    id: string;
    image: string;
    name: string;
    types: string[];
}

export interface PokemonLinksInterface {
    first: string;
    last: string;
    prev: null | string;
    next: string;
}

export interface PokemonMetaInterface {
    current_page: string;
    from: string;
    last_page: string;
    path: string;
    per_page: string;
    to: string;
    total: string;
}

export interface UrlParams {
    name: string | undefined;
    pageNum: string;
}

export interface ApiPropsInterface {
    pokedexApi: string;
}
