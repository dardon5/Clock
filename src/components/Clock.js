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
      clock: null,
      tZone: props.timezone,
      options: data,
      mode: true,
      daylight: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMode = this.handleMode.bind(this);
    this.handleDaylight = this.handleDaylight.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      let time = new Date().toLocaleTimeString("en-US", {
        timeZone: this.state.tZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: !this.state.mode,
      });
      this.setState({
        clock: time,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleChange(selectedOption) {
    console.log(`Option selected:`, selectedOption);
    let newZone =
      this.state.options[this.state.options.indexOf(selectedOption)].value;
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
  }

  render() {
    const { selectedOption, options } = this.state;
    return (
      <div className="card">
        <h1 className="header">Clock</h1>
        <div className="divider">
          <Divider orientation="horizontal" flexItem />
        </div>
        <div className="wrapper">
          {`${this.state.tZone}: ${this.state.clock}`}

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
            <FormGroup>
              <FormControlLabel
                label="Daylight Savings"
                control={<Switch onChange={this.handleDaylight} />}
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
        </div>
      </div>
    );
  }
}
