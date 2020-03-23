import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    allMovies: getMovies(),
    pageSize: 4,
    currentPage: null
  };

  handleDelete = movie => {
    const filtered_movie_id = movie._id;
    const filterdMovies = this.state.allMovies.filter(movie => {
      return movie._id !== filtered_movie_id;
    });
    return this.setState({ movies: filterdMovies });
  };

  handleLike = movie => {
    const movies = [...this.state.allMovies];
    const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage, allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        {allMovies.length === 0 ? (
          <p>There is no movies on the database</p>
        ) : (
          <React.Fragment>
            <p>Showing {allMovies.length} movies in the database</p>
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
                {movies.map(movie => {
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
            <Pagination
              itemsCount={allMovies.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
