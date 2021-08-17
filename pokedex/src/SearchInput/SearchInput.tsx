import {ChangeEvent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

function SearchInput() {

    const [query, setQuery] = useState("");
    const history = useHistory();

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    useEffect(() => {
        const params = new URLSearchParams()
        if (query) {
            params.append("name", query)
        } else {
            params.delete("name")
        }

        history.push({search: params.toString()})
    }, [query, history])

    return (

        <input type="text" value={query} onChange={onChange} />
    );
}

export default SearchInput;
