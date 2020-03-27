import React, { Component } from "react";

class TableBody extends Component {
  render() {
    const { data } = this.props;
    return (
      <tbody>
        <tr>
          {data.map(item => {
            <td>item</td>;
          })}
        </tr>
      </tbody>
    );
  }
}

export default TableBody;
