import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import "./Dashboard.css";
import { Switch, Typography } from "@material-ui/core";
import axios from "axios";

import TableComponent from "./TableComponent/TableComponent";

const Dashboard = () => {
  const [instances, setInstances] = useState([]);
  const [isUSD, setIsUSD] = useState(true);
  const [charges, setCharges] = useState([0.19, 0.35]);

  useEffect(() => {
    getInstances();
  }, []);

  useEffect(() => {
    const runningInstances = instances
      .filter((instance) => instance.status === "running")
      .reduce((a, b) => {
        return a + b.costPerHour;
      }, 0);

    const stoppedInstances = instances
      .filter((instance) => instance.status === "stopped")
      .reduce((a, b) => {
        return a + b.costPerHour;
      }, 0);

    setCharges([runningInstances.toFixed(3), stoppedInstances.toFixed(3)]);
  }, [instances]);

  const getInstances = async () => {
    const res = await axios.get("/api/instances", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authorization"),
      },
    });
    setInstances(res.data.instances);
    return res.data;
  };

  const startInstance = async (id) => {
    const res = await axios.get(`/api/instances/start/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authorization"),
      },
    });
    getInstances();
    return res.data;
  };

  const stopInstance = async (id) => {
    const res = await axios.get(`/api/instances/stop/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authorization"),
      },
    });
    getInstances();
    return res.data;
  };

  const onCurrencyChange = () => {
    let newCharges;
    if (isUSD) {
      newCharges = charges.map((charge) => (charge * 72.96).toFixed(2));
    } else {
      newCharges = charges.map((charge) => (charge / 72.96).toFixed(2));
    }
    setCharges(newCharges);
    setIsUSD(!isUSD);
  };

  return (
    <div className="dashboard__container">
      <div>
        <Header />
      </div>
      <div className="view__container">
        {/* Instance Info Container */}
        <div className="instance__container">
          <div className="typography__container">
            <div style={{ marginLeft: "20px" }}>
              <Typography variant="h6">
                {isUSD ? "$" : "₹"}
                {charges[0]}/hr
              </Typography>
              <Typography variant="body1">Running Instances</Typography>
            </div>
            <div style={{ marginLeft: "20px" }}>
              <Typography variant="h6">
                {isUSD ? "$" : "₹"}
                {charges[1]}/hr
              </Typography>
              <Typography variant="body1">Stopped Instances</Typography>
            </div>
          </div>
          <div className="switch__box">
            <Typography variant="body1">INR</Typography>
            <Switch
              color="primary"
              checked={isUSD}
              onChange={onCurrencyChange}
            />
            <Typography variant="body1">USD</Typography>
          </div>
        </div>
        {/* Instance Table Container */}
        <TableComponent
          instances={instances}
          startInstance={startInstance}
          stopInstance={stopInstance}
          isUSD={isUSD}
        />
      </div>
    </div>
  );
};

export default Dashboard;
