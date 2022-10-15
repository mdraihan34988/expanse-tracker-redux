import React from "react";
import { Link } from "react-router-dom";

function ViewAll({goTO="/",text}) {
  return (
    <div className="form">
      <Link to={goTO}>
        <button className="btn" type="button">
          {text}
        </button>
      </Link>
    </div>
  );
}

export default ViewAll;
