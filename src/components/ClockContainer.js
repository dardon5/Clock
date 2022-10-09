import Clock from "./Clock";
import React from "react";
import "./ClockContainer.scss";

export default function ClockContainer() {
  return (
    <div className="clock-container">
      <Clock timezone="GMT" />
    </div>
  );
}
