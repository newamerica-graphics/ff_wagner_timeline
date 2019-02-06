import React from "react";
import Card from "../../components/Card";
import CheckboxGroup from "../../components/CheckboxGroup";
import "./Database.scss";

export default class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      principals: {},
      locations: {}
    };
    this.principals = this.props.data.reduce((acc, war) => {
      if (!acc.includes(war["Principal"])) {
        acc.push(war["Principal"]);
        this.state.principals[war["Principal"]] = true;
      }
      return acc;
    }, []);
    this.locations = this.props.data.reduce((acc, war) => {
      if (!acc.includes(war["Location"])) {
        acc.push(war["Location"]);
        this.state.locations[war["Location"]] = true;
      }
      return acc;
    }, []);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange = (e, filter) => {
    const id = e.target.id;
    const checked = e.target.checked;
    this.setState(prevState => ({
      ...prevState,
      [filter]: {
        ...prevState[filter],
        [id]: checked
      }
    }));
  };

  render() {
    const { data } = this.props;
    const { principals, locations } = this.state;
    let _data = data.filter(
      war => principals[war["Principal"]] && locations[war["Location"]]
    );
    return (
      <div className="dv-full dv-Database">
        <div className="dv-Database__info row">
          <h3 className="col-12">Participants in Today’s Major Proxy Wars</h3>
        </div>
        <div className="dv-Database__container row">
          <div
            className="dv-Database__filters col-12 col-sm-4"
            ref={el => (this.filterEl = el)}
          >
            <h3>Filter By</h3>
            <CheckboxGroup
              title="Principals"
              options={this.principals.map(p => ({
                id: p,
                label: p,
                checked: principals[p]
              }))}
              orientation="vertical"
              style={{
                borderTop: "1px solid #333",
                borderBottom: "1px solid #333",
                padding: "1rem 0"
              }}
              onChange={e => this.onCheckboxChange(e, "principals")}
            />
            <CheckboxGroup
              title="Locations"
              options={this.locations.map(l => ({
                id: l,
                label: l,
                checked: locations[l]
              }))}
              orientation="vertical"
              style={{
                borderBottom: "1px solid #333",
                padding: "1rem 0"
              }}
              onChange={e => this.onCheckboxChange(e, "locations")}
            />
            <div className="dv-Database__filter-label">
              Showing {_data.length} of {data.length}
            </div>
          </div>
          <div className="dv-Database__cards col-12 col-sm-8">
            {_data.map(war => {
              return <Card data={war} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
