const React = require("react");
class Index extends React.Component {
  render() {
    const { logs } = this.props;
    return (
      <div>
        <h1>All Logs</h1>
        <div>
          {logs.map((log, i) => {
            return (
              <div>
                <h1>{log.title}</h1>
                <h2>Entry</h2>
                <p>{log.entry}</p>
                <h3>Ship Condition</h3>
                {log.shipIsBroken ? <p>SHIP BROKE</p> : <p>SHIP INTACT</p>}
                <a href={`/logs/${log._id}/edit`}>Edit</a>
                <form action={`logs/${log._id}?_method=DELETE`} method="POST">
                  <input type="submit" value="DELETE" />
                </form>
              </div>
            );
          })}
        </div>
        <button>
          <a href="logs/new">Add Logs</a>
        </button>
      </div>
    );
  }
}

module.exports = Index;
