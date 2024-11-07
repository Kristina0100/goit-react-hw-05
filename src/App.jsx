// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import MovieCast from './components/MovieCast/MovieCast'
import MovieReviews from "./components/MovieReviews/MovieReviews";
import Navigation from './components/Navigation/Navigation';
import NotFoundPage from './pages/NotFoundPage';


import './App.css'

function App() {

  return (
    <>
      <Navigation />
      <main>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/movies" element={<MoviesPage />} />

        <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
        <Route path="cast" element={<MovieCast/>}/>
        <Route path="reviews" element={<MovieReviews/>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </main>
    </>
  )
}

export default App
