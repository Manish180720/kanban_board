import React, { useState, useEffect } from "react";
import { fetchTickets, fetchUsers } from "./apifetch";
import Column from "./Column";
import Ticket from "./Ticket";
import "./Board.css";
import Navbar from "./Navbar";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'; // Icons for status
// import { faExclamationCircle, faArrowUp, faArrowDown, faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // Icons for priority


function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(
    localStorage.getItem("groupingOption") || "status"
  );
  const [sortedBy, setSortedBy] = useState(
    localStorage.getItem("sortedBy") || "priority"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const ticketData = await fetchTickets();
        const userData = await fetchUsers();

        setTickets(ticketData.tickets);
        setUsers(userData.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("groupingOption", groupingOption);
  }, [groupingOption]);

  useEffect(() => {
    localStorage.setItem("sortedBy", sortedBy);
  }, [sortedBy]);

  const groupTicketsByOption = (tickets, option, users) => {
    const groupedTickets = {};

    if (!Array.isArray(tickets)) {
      return groupedTickets;
    }

    tickets.forEach((ticket) => {
      let key;
      if (option === "status") {
        key = ticket.status;
      } else if (option === "user" && users) {
        const user = users.find((user) => user.id === ticket.userId);
        key = user ? user.name : "Unknown User";
      } else if (option === "priority") {
        key = priorityLabels[ticket.priority];
      }

      if (!groupedTickets[key]) {
        groupedTickets[key] = [];
      }
      groupedTickets[key].push(ticket);
    });

    if (option === "status") {
      groupedTickets["Done"] = [];
      groupedTickets["Canceled"] = [];
    }

    return groupedTickets;
  };

  const priorityLabels = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  const sortTicketsByOption = (groupedTickets, option) => {
    const sortedTickets = {};

    Object.keys(groupedTickets).forEach((groupTitle) => {
      const group = groupedTickets[groupTitle];
      sortedTickets[groupTitle] =
        option === "priority"
          ? group.sort((a, b) => b.priority - a.priority)
          : group.sort((a, b) => a.title.localeCompare(b.title));
    });

    return sortedTickets;
  };

  const groupedTickets = groupTicketsByOption(tickets, groupingOption, users);
  const sortedTickets = sortTicketsByOption(groupedTickets, sortedBy);

  const groupingOptions = [
    { label: "Group by Status", value: "status" },
    { label: "Group by User", value: "user" },
    { label: "Group by Priority", value: "priority" },
  ];

  const sortingOptions = [
    { label: "Sort by Priority", value: "priority" },
    { label: "Sort by Title", value: "title" },
  ];

  const renderTickets = (ticketList) => {
    if (Array.isArray(ticketList)) {
      return (
        <div className="ticket-list">
          {ticketList.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="ticket-placeholder">No tickets in this category.</div>
      );
    }
  };

  return (
    <div>
      <div className="kanban-board">
        <Navbar
          groupingOption={groupingOption}
          setGroupingOption={setGroupingOption}
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
          groupingOptions={groupingOptions}
          sortingOptions={sortingOptions}
        />

        <div className="board-columns">
          {Object.keys(sortedTickets).map((groupTitle) => (
            <Column
              key={groupTitle}
              title={groupTitle}
              name={groupTitle}
              tickets={sortedTickets[groupTitle] || []}
            >
              {groupTitle === "priority" && (
                <div className="checkbox-placeholder">
                  <input type="checkbox" />
                </div>
              )}
              <div className="priority-info">
                Priority: {groupTitle} (Order: {priorityLabels[groupTitle]})
              </div>
              {renderTickets(sortedTickets[groupTitle])}
            </Column>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
