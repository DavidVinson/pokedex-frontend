export interface ApiDataInterface {
    data: PokemonListInterface[];
    links: PokemonDataLinksInterface;
    meta: PokemonMetaInterface;
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

export interface PokemonDataLinksInterface {
    first: string;
    last: string;
    prev: string;
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
    pageNum?: string;
}
