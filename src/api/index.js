import { film } from '../store/film';
import { error, isFetching } from '../store/app';

const url = 'http://www.omdbapi.com/?apikey=c411534d&'; // to generate a key please use http://www.omdbapi.com/

export async function getFilm(searchTerm) {
  isFetching.set(true);
  try {
    let response = await fetch(`${url}&t=${searchTerm}`, {
      method: 'GET'
    });
    // let result = await response.json();
    let result = {"Title":"Batman","Year":"1989","Rated":"PG-13","Released":"23 Jun 1989","Runtime":"126 min","Genre":"Action, Adventure","Director":"Tim Burton","Writer":"Bob Kane (Batman characters), Sam Hamm (story), Sam Hamm (screenplay), Warren Skaaren (screenplay)","Actors":"Michael Keaton, Jack Nicholson, Kim Basinger, Robert Wuhl","Plot":"The Dark Knight of Gotham City begins his war on crime with his first major enemy being the clownishly homicidal Joker.","Language":"English, French, Spanish","Country":"USA, UK","Awards":"Won 1 Oscar. Another 8 wins & 26 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.5/10"},{"Source":"Rotten Tomatoes","Value":"72%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"7.5","imdbVotes":"317,478","imdbID":"tt0096895","Type":"movie","DVD":"25 Mar 1997","BoxOffice":"N/A","Production":"Warner Bros. Pictures","Website":"N/A","Response":"True"}
    if (response.status === 200 && !result.Error) {
      film.set(result);
    } else {
      error.set(result.Error);
    }

    isFetching.set(false);
  } catch (e) {
    isFetching.set(false);
    error.set(e.message);
  }
}
