import React, { Component } from "react";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FormGroup, tableBodyClasses } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./Clock.scss";
import Select from "react-select/";
import data from "../data/Data";

export default class Clock extends Component {
  constructor(props) {
    super();
    this.state = {
      clock: new Date().setUTCHours(0, 0, 0, 0),
      tZone: props.timezone,
      options: data,
      mode: true,
      daylight: false,
      alarmTime: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMode = this.handleMode.bind(this);
    this.handleDaylight = this.handleDaylight.bind(this);
    this.handleAlarm = this.handleAlarm.bind(this);
    this.checkAlarm = this.checkAlarm.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      let time = new Date(this.state.clock);
      this.setState({
        clock: time.setSeconds(time.getSeconds() + 1),
      });
    }, 1000);
    this.interval = setInterval(() => this.checkAlarm(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleChange(selectedOption) {
    console.log(`Option selected:`, selectedOption);
    let newZone = this.state.options[this.state.options.indexOf(selectedOption)]
      .value;
    this.setState({
      tZone: newZone,
    });
  }

  handleMode() {
    this.setState({
      mode: !this.state.mode,
    });
  }
  handleDaylight() {
    this.setState({
      daylight: !this.state.daylight,
    });
    let newTime = new Date(this.state.clock);

    if (this.state.daylight) {
      newTime.setHours(newTime.getHours() - 1);
    } else {
      newTime.setHours(newTime.getHours() + 1);
    }
    this.setState({
      clock: newTime,
    });
  }
  handleAlarm() {}

  checkAlarm() {
    if (this.state.alarmTime == "undefined" || !this.state.alarmTime) {
      this.alarmMessage = "";
    } else {
      this.alarmMessage = "Your alarm is set for " + this.state.alarmTime + ".";
      if (this.state.clock === this.state.alarmTime) {
        window.location.href =
          "https://www.freespecialeffects.co.uk/soundfx/sirens/alarm_01.wav";
      } else {
        console.log("not yet");
      }
    }
  }

  render() {
    const { selectedOption, options } = this.state;
    const value = null;
    return (
      <div className="card">
        <h1 className="header">Clock</h1>
        <div className="divider">
          <Divider orientation="horizontal" flexItem />
        </div>
        <div className="wrapper">
          {this.state.tZone}: {"  "}
          {new Date(this.state.clock).toLocaleTimeString("en-US", {
            timeZone: this.state.tZone,
            // hour: "2-digit",
            // minute: "2-digit",
            hour12: !this.state.mode,
          })}
          <div className="form">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
                onChange={this.handleMode}
              >
                <FormControlLabel
                  control={<Radio />}
                  label="12-hour"
                  checked={this.state.mode === false}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="24-hour"
                  checked={this.state.mode === true}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="daylight">
            <FormGroup onChange={this.handleDaylight}>
              <FormControlLabel
                label="Daylight Savings"
                control={<Switch />}
                value={this.state.daylight}
              />
            </FormGroup>
          </div>
          <div className="select">
            <Select
              placeholder="Select Timezone"
              value={selectedOption}
              options={options}
              onChange={this.handleChange}
            ></Select>
          </div>
          <div className="alarm">
            <h2>{this.alarmMessage}</h2>
          </div>
        </div>
      </div>
    );
  }
}
