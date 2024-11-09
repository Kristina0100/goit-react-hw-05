import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const Navigation = lazy(() => import('./components/Navigation/Navigation'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

import './App.css'

function App() {

  return (
    <>
      <Navigation />
      <main>
         <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movies" element={<MoviesPage />} />

        <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
        <Route path="credits" element={<MovieCast/>}/>
        <Route path="reviews" element={<MovieReviews/>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
      </main>
    </>
  )
}

export default App
