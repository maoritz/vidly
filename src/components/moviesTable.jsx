import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];

  render() {
    const { onLike, onDelete, onSort, movies, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {movies.map(movie => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td> {movie.numberInStock} </td>
                <td> {movie.dailyRentalRate} </td>
                <td>
                  <Like liked={movie.liked} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <button
                    onClick={() => onDelete(movie)}
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
    );
  }
}

export default MoviesTable;
