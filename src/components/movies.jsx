import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const filtered_movie_id = movie._id;
    const filterdMovies = this.state.movies.filter(movie => {
      return movie._id !== filtered_movie_id;
    });
    return this.setState({ movies: filterdMovies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.movies.length === 0 ? (
          <p>There is no movies on the database</p>
        ) : (
          <React.Fragment>
            <p>Showing {this.state.movies.length} movies in the database</p>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map(movie => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td> {movie.numberInStock} </td>
                      <td> {movie.dailyRentalRate} </td>
                      <td>
                        <Like
                          liked={movie.liked}
                          onLikeToggle={() => this.handleLike(movie)}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
