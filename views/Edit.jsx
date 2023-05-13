const React = require("react");

class Edit extends React.Component {
  render() {
    const logs = this.props.log;
    return (
      <div>
        <div>Edit Logs</div>
        <form action={`/logs/${logs._id}?_method=PUT`} method="POST">
          Title: <input type="text" name="title" defaultValue={logs.title} />
          Entry:
          <input type="textarea" name="entry" defaultValue={logs.entry}></input>
          Ship Broken:
          {logs.shipIsBroken ? (
            <input type="checkbox" name="shipIsBroken" defaultChecked />
          ) : (
            <input type="checkbox" name="shipIsBroken" />
          )}
          <input type="submit" value="Submit Changes" />
        </form>
        <a href="/logs">Home</a>
      </div>
    );
  }
}

module.exports = Edit;
