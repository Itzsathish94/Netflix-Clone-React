import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import {useNavigate, useParams} from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTVhNGNjYTg5NGIyMDQ3M2VlNTY2NGZkZTI4Y2VkOCIsIm5iZiI6MTczNzI5NDMzMC4xNDEsInN1YiI6IjY3OGQwMWZhNjhlMGQ4NzM2MzZkZmNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._tTZxU_M7hBI7O3HGUigXyIU7oJ15dngL_8w6mNTgK0'
    }
  };
  
    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));
    },[])


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate('/')}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title="Trailer" frameborder="0" allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10 )}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
