import Timeline from "./charts/Timeline";
import Select from "./components/Select";

export default class TimelineWithFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
    this.filters = this.props.data.reduce(
      (acc, cur) => {
        const tags = cur.tags.split(", ");
        tags.forEach(tag => {
          if (!acc.includes(tag)) {
            acc.push(tag);
          }
        });
        return acc;
      },
      ["All"]
    );
  }

  onSelectChange = e => {
    let newData;
    if (e.target.value === "All") {
      newData = this.props.data;
    } else {
      newData = this.props.data.filter(row =>
        row.tags.includes(e.target.value)
      );
    }
    this.setState({ data: newData });
  };

  render() {
    const { data } = this.state;
    return (
      <Timeline {...this.props} data={data}>
        <div style={{ marginLeft: "0.5rem", marginBottom: "1rem" }}>
          Filter by:
          <Select
            onChange={this.onSelectChange}
            options={this.filters}
            style={{ marginLeft: "0.5rem" }}
          />
        </div>
      </Timeline>
    );
  }
}
