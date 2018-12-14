import "./index.scss";
import Database from "./charts/Database";
import TimelineWithFilter from "./TimelineWithFilter"

let queue = [];
let data = null;
const mapboxKey = MAPBOX_API_KEY;

const settings = {
  viz__map: el => {
    ReactDOM.render(<StaticMap />, el);
  },
  viz__database: el => {
    ReactDOM.render(<Database data={data.map} />, el);
  },
  viz__timeline: el => {
    const timelineData = data.timeline.map((val, i) => ({
      ...val,
      date: new Date(val.date),
      dateString: val.date
    }));
    ReactDOM.render(<TimelineWithFilter data={timelineData} divisionWidth={30} title="Major Political-Military Events in the History of Proxy Warfare 1947 - Today" />, el);
  }
};

fetch("https://na-data-projects.s3.amazonaws.com/data/isp/proxy_warfare.json")
  .then(response => response.json())
  .then(_data => {
    data = _data;
    for (let i = 0; i < queue.length; i++) queue[i]();
  });

window.renderDataViz = function(el) {
  let id = el.getAttribute("id");
  let chart = settings[id];
  if (!chart) return;

  if (data) {
    chart(el);
  } else {
    queue.push(() => chart(el));
  }
};

const StaticMap = () => (
  <div className="dv-ProxyWar-Map">
    <div style={{ paddingBottom: "1rem" }}>
      Active Proxy Wars - this can be embedded anywhere within the text of the
      report
    </div>
    <img
      src={`https://api.mapbox.com/styles/v1/newamericamapbox/cjoa6tzcr00cf2rlh7fhgawsl/static/34.99299,32.20005,2.5,0,0/1200x600?access_token=${mapboxKey}`}
      srcSet={`https://api.mapbox.com/styles/v1/newamericamapbox/cjoa6tzcr00cf2rlh7fhgawsl/static/34.99299,32.20005,2.5,0,0/1200x600?access_token=${mapboxKey} 1x, https://api.mapbox.com/styles/v1/newamericamapbox/cjoa6tzcr00cf2rlh7fhgawsl/static/34.99299,32.20005,2.5,0,0/1200x600@2x?access_token=${mapboxKey} 2x`}
      alt="Map of Active Proxy Wars Around the World, including Syria, Iraq, Afqhanistan, Libya, Yemen, and Ukraine"
      style={{ width: "100%", height: "auto" }}
    />
  </div>
);
