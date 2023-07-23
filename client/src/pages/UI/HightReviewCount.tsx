import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoviePoster from './MoivePoster';

interface Movie {
  title: string;
  docId: string;
  repRlsDate: string;
  score: number;
  bookmarked: boolean;
  posterUrl: string;
}

const HighReviewCount: React.FC = () => {
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
          const mostReviewTop5 = data.mostReview;
          setMovies(mostReviewTop5);
          console.log(mostReviewTop5);
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
        <h2 className="ml-5 mt-5 text-3xl font-medium">
          리뷰 많은 순{' '}
          {showAllMovies ? (
            <button className="ml-5 text-xl hover:bg-mainyellow" onClick={handleShowMoreMovies}>
              더보기 접기
            </button>
          ) : (
            <></>
          )}
        </h2>
        <div className="mx-10 -mb-4 flex flex-row flex-wrap justify-between p-2">
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
        <button className="mb-10 ml-24 text-2xl hover:bg-mainyellow" onClick={handleShowMoreMovies}>
          관련 영화 더보기
        </button>
      )}
    </div>
  );
};
export default HighReviewCount;
