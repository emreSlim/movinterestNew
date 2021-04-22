const API_KEY = '916f74387a339a92561aa1d4dea3be51';

module.exports = {
  searchMovies: async query => {
    const apiURL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&api_key=${API_KEY}`;
    try {
      let response = await fetch(apiURL).then(res => res.json());
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getImageURL: (imagePath, imageWidth) => {
    const width = imageWidth || 500;
    return `https://image.tmdb.org/t/p/w${width}${imagePath}`;
  },
  getMovieDetails: async id => {
    const apiURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    try {
      let response = await fetch(apiURL).then(res => res.json());
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getTrendingMovies: async () => {
    const apiURL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
    try {
      let response = await fetch(apiURL).then(res => res.json());
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getTrendingMoviesWeek: async () => {
    const apiURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
    try {
      let response = await fetch(apiURL).then(res => res.json());
      return response;
    } catch (e) {
      console.log(e);
    }
  },
};
