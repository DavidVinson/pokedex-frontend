import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchInput() {
    const [query, setQuery] = useState('');
    const history = useHistory();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }

    useEffect(() => {
        const params = new URLSearchParams();
        if (query) {
            params.append('name', query);
        } else {
            params.delete('name');
        }

        history.push({ search: params.toString() });
    }, [query, history]);

    return <input type="text" placeholder="Search Pokédex" value={query} onChange={onChange} />;
}

export default SearchInput;
