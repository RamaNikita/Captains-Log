const React = require("react");
class Show extends React.Component {
  render() {
    const { log } = this.props.log;

    return (
      <div>
        <h1>{log.title}</h1>
        <p>{log.entry}</p>
        <p> Ship is {log.shipIsBroken ? "broken" : "not broken"}</p>
        <a href="/logs">Home</a>
      </div>
    );
  }
}

module.exports = Show;
