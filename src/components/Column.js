import React from "react";
import Ticket from "./Ticket";
import "./Column.css";

const Column = ({ title, tickets}) => {
  const count = tickets.length;
  return (
    <div className="boardColumn">
      <div className="title">
       {title}
       <div className="count">{count} </div>

       <div className="icon-buttons">
          + ...
        </div>
      </div>

      {/* <h2>{}</h2> */}
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default Column;
