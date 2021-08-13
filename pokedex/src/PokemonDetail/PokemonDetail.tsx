import {useParams} from 'react-router-dom';

function PokemonDetail() {

    const params = useParams();
    console.log('params', params);

    return (

        <div>
            <button>home</button>
            <h2>

                The pokemon ID: {params}

            </h2>
        </div>

    );
}

export default PokemonDetail;