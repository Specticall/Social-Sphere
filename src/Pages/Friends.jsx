import { useState } from "react";
import Searchbar from "../Components/Searchbar";
import { friendData } from "../Data/friendsdata";

const filters = ["Online", "All", "Pending", "Blocked"];

export default function Friends() {
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <div className="page__friends">
      <div className="left"></div>
      <div className="right">
        <h1>Your Friends</h1>
        <div className="navbar-filters">
          <ul className="filter">
            {filters.map((label, i) => (
              <li
                className={`${
                  selectedFilter === i ? "selected" : null
                } ${label.toLowerCase()}`}
                key={`${label}-${i}`}
                onClick={() => setSelectedFilter(i)}
              >
                <p>{label}</p>
              </li>
            ))}
          </ul>
          <Searchbar
            hideProfilePic={true}
            className="filter-search"
          />
        </div>
        <ul className="friends-list">
          <header>
            <p>{filters.at(selectedFilter)} - 15</p>
            <div className="friend-sort__container">
              <label htmlFor="friend-sort">Sort by</label>
              <select id="friend-sort" className="sort">
                <option value="Sort by A - Z">A - Z</option>
                <option value="Sort by Z - A">Z - A</option>
              </select>
            </div>
          </header>
          {friendData.map((friend) => (
            <li key={friend.id}>
              <article>
                <img
                  className="pfp"
                  src={`https://source.unsplash.com/${friend.pfp_id}`}
                />
                <div className="info">
                  <h3 className="name">{friend.name}</h3>
                  <p className="tag">{friend.tag}</p>
                </div>
              </article>
              <div className="buttons">
                <button className="call">
                  <i className="bx bx-phone"></i>
                </button>
                <button className="chat">
                  <i className="bx bx-chat"></i>
                </button>
                <button className="more">
                  <i className="bx bx-dots-vertical-rounded"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
