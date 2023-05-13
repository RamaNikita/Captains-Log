const React = require("react");

class New extends React.Component {
  render() {
    return (
      <>
        <form action="/logs" method="POST">
          Title: <input type="text" name="title"></input>
          Entry:<input type="textarea" name="entry"></input>
          Ship Broken:
          <input type="checkbox" name="shipIsBroken"></input>
          <input type="submit" value="Add to Logs"></input>
        </form>
        <a href="/logs">Home</a>
      </>
    );
  }
}

module.exports = New;
