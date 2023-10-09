import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoviePoster from './MoivePoster';
import { BsFillTrophyFill } from 'react-icons/bs';

interface Movie {
  title: string;
  docId: string;
  repRlsDate: string;
  score: number;
  bookmarked: boolean;
  posterUrl: string;
}

const BoxOfficeMovies: React.FC = () => {
  const [showAllMovies, setShowAllMovies] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080/main'
        ); //엔드포인트

        if (response.status === 200) {
          const data = response.data;
          const BoxOfficeTop5 = data.boxOffice;
          setMovies(BoxOfficeTop5);
          console.log(BoxOfficeTop5);
        } else {
          console.log('Failed to fetch movies:', response.data);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleShowMoreMovies = () => {
    setShowAllMovies(!showAllMovies);
  };

  const renderMovies = () => {
    const moviesToRender = showAllMovies ? movies : movies.slice(0, 5);
    return (
      <div className="flex flex-col">
        <h2 className="ml-14 mt-14 flex gap-2 text-3xl font-bold">
          <BsFillTrophyFill />
          박스오피스 순위{' '}
          {showAllMovies ? (
            <button
              className="ml-5 text-xl text-maindarkgray hover:bg-mainyellow"
              onClick={handleShowMoreMovies}
            >
              더보기 접기
            </button>
          ) : (
            <></>
          )}
        </h2>
        <div className="mx-10 mb-4 flex flex-row flex-wrap justify-between shadow-lg">
          {moviesToRender.map((movie, index) => (
            <MoviePoster
              key={index}
              movieId={movie.docId}
              title={movie.title}
              releaseDate={movie.repRlsDate}
              score={movie.score}
              bookmarked={movie.bookmarked}
              posterUrl={movie.posterUrl}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-2">
      {renderMovies()}
      {!showAllMovies && movies.length > 5 && (
        <button
          className="mb-10 ml-14 text-xl font-semibold hover:bg-mainyellow"
          onClick={handleShowMoreMovies}
        >
          관련 영화 더보기 ▾
        </button>
      )}
    </div>
  );
};
export default BoxOfficeMovies;
