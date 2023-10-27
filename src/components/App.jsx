import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link, Navigation, NavList, NavItem } from './App.styled';
const MovieDetails = lazy(() => import('./MovieDetails'));
const Home = lazy(() => import('./Home'));
const Reviews = lazy(() => import('./Reviews'));
const Cast = lazy(() => import('./Cast'));
const Movies = lazy(() => import('./Movies'));

function App() {
  return (
    <div>
      <header>
        <Navigation>
          <NavList>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/movies">Movies</Link>
            </NavItem>
          </NavList>
        </Navigation>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieid" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<div>not foutn</div>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
