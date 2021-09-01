declare module 'myTypes' {
    interface HeaderPropsInterface {
        title: string;
    }

    interface PokemonDetailInterface {
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

    interface PokemonListInterface {
        id: string;
        image: string;
        name: string;
        types: string[];
    }

    interface PokemonLinksInterface {
        first: string;
        last: string;
        prev: null | string;
        next: string;
    }

    interface PokemonMetaInterface {
        current_page: string;
        from: string;
        last_page: string;
        path: string;
        per_page: string;
        to: string;
        total: string;
    }

    interface UrlParams {
        name: string | undefined;
        pageNum: string;
    }

    interface ApiPropsInterface {
        pokedexApiV1: string;
    }
}

module.exports = {
    HeaderPropsInterface,
    PokemonDetailInterface,
    PokemonListInterface,
    PokemonLinksInterface,
    PokemonMetaInterface,
    UrlParams,
    ApiPropsInterface,
};
