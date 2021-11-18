import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // Trasformo in una costante
    const fetchMoviesHandler = useCallback(async () => {

        setIsLoading(true)  // Esegui il loading o mostra la scritta 'Found no movies'
        setError(null)

        try {
            // Di default è impostata la GET dunque non serve mettere il metodo
            const response = await fetch('https://swapi.dev/api/films') // films => film => visualizzi errore

            // Se qualcosa va storto, esegui questo
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const data = await response.json();


            // mappo gli oggetti della fetch con i nomi che voglio io riportandoli in Movies.js
            const transormedMovies = data.results.map(movieData => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                }
            })
            setMovies(transormedMovies)

            // Se qualcosa va storto, mostra il messaggio
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false) /* Ritorna a false, non ha importanza se la richiesta
                                     ha avuto successo o errore, perchè in entrambi i
                                     casi, smette di caricare.
                                  */
    }, [])


    /* Uso useEffect per mandare una richiesta HTTP immediatamente
    * quando un componente viene caricato e non solo quando viene
    * cliccato.
    */
    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);


    // SE NON CI SONO DATI PRESENTI ALLORA:
    let content = <p>Found no movies</p>

    // SE HA CARICATO I DATI ALLORA:
    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>
    }

    //SE NON STA CARICANDO E ABBIAMO UN ERRORE ALLORA:
    if (error) {
        content = <p>{error}</p>
    }

    // SE STA CARICADNO I DATI ALLORA:
    if (isLoading) {
        content = <p>Loading...</p>
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
