import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    allMovies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { sortColumn: { path: "title", order: "asc" } }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ allMovies: getMovies(), genres: genres });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
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
    const {
      pageSize,
      currentPage,
      selectedGenre,
      allMovies,
      sortColumn
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
            items={this.state.genres}
          />
        </div>
        <div className="col">
          {allMovies.length === 0 ? (
            <p>There is no movies on the database</p>
          ) : (
            <React.Fragment>
              <p>Showing {filtered.length} movies in the database</p>
              <MoviesTable
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                movies={movies}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Movies;
