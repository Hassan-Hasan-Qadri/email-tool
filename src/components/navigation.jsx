import React from "react";

export const Navigation = ({sno}) => {
  return (
    <div style={{ paddingTop: '60px'}}>
      <div class="topnav">
        <a class={sno == 1 ? "active" : ''} href="/">Creator</a>
        <a class={sno == 3 ? "active" : ''} href="/templatelist">List</a>
        <a class={sno == 2 ? "active" : ''} href="/emailsender">Sender</a>
        {/* <a href="#about">About</a> */}
      </div>
    </div>
  );
};
