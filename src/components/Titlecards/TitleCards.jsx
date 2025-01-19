import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'


const TitleCards = ({title,category}) => {

  const [apiData,setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTVhNGNjYTg5NGIyMDQ3M2VlNTY2NGZkZTI4Y2VkOCIsIm5iZiI6MTczNzI5NDMzMC4xNDEsInN1YiI6IjY3OGQwMWZhNjhlMGQ4NzM2MzZkZmNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._tTZxU_M7hBI7O3HGUigXyIU7oJ15dngL_8w6mNTgK0'
    }
  };
  
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className='title-cards'>
      <h2> {title ? title : 'Ppular on Netflix' }</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/`+ card.backdrop_path} alt="movie image" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
