import { useState } from "react";

/**
 * Component for sorting components
 *
 * States :
 * 0: Ascending (A - Z),
 * 1: Descending (Z - A)
 * @param {Object} obj
 * @param {function} obj.stateSetter
 * @returns {void}
 */
export default function Sort({ stateSetter }) {
  return (
    <div className="friend-sort__container">
      <label htmlFor="friend-sort">Sort by</label>
      <select
        id="friend-sort"
        className="sort"
        onChange={(e) => {
          stateSetter(+e.target.value);
        }}
      >
        <option value={0}>A - Z</option>
        <option value={1}>Z - A</option>
      </select>
    </div>
  );
}
