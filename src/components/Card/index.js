import React from "react";
import "./Card.scss";

const Sources = ({ data }) => {
  const keys = Object.keys(data);
  const sources = keys.filter(c => c.includes("source"));
  const names = keys.filter(c => c.includes("name"));
  return (
    <div className="dv-Card__sources">
      <span>
        Source{data[names[1]] ? "s" : ""}:{" "}
        {names.map((name, i) => {
          if (data[name] && data[names[i + 1]]) {
            return (
              <span>
                <a href={data[sources[i]]} target="_blank" rel="noopener">
                  {data[name]}
                </a>
                {", "}
              </span>
            );
          } else if (data[name]) {
            return (
              <a href={data[sources[i]]} target="_blank" rel="noopener">
                {data[name]}
              </a>
            );
          } else {
            return null;
          }
        })}
      </span>
    </div>
  );
};

export default props => {
  return (
    <div className="dv-Card">
      <div className="dv-Card__top">
        <div
          className="dv-Card__image"
          style={{
            backgroundImage: `url(${props.data.image})`
          }}
        />
        <div className="dv-Card__meta">
          <div className="dv-Card__meta-group" style={{ width: "100%" }}>
            <span
              className="dv-Card__value dv-Card__value-small"
              style={{ color: "#555" }}
            >
              {props.data["Date Major Involvement Began"]} - Present
            </span>
          </div>
          <div className="dv-Card__meta-group">
            <span className="dv-Card__label">Principal</span>
            <span className="dv-Card__value">{props.data["Principal"]}</span>
          </div>
          <div className="dv-Card__meta-group">
            <span className="dv-Card__label">Location</span>
            <span className="dv-Card__value">{props.data["Location"]}</span>
          </div>
          <div className="dv-Card__meta-group" style={{ width: "100%" }}>
            <span className="dv-Card__label">Agents Backed</span>
            <span className="dv-Card__value dv-Card__value-small">
              {props.data["Agents Backed"]}
            </span>
          </div>
        </div>
      </div>
      <div className="dv-Card__description">{props.data.description}</div>
      <Sources data={props.data} />
    </div>
  );
};
