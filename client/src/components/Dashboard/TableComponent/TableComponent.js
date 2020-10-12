import React from "react";
// Material-UI --------------------------------------------------------------------------------
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// Customized Material-UI ---------------------------------------------------------------------
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#B3D0CE",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#E6EEEF",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#F1EFF1",
    },
  },
}))(TableRow);

// Component starts -------------------------------------------------------------------

const TableComponent = ({ instances, startInstance, stopInstance, isUSD }) => {
  const actionOnInstance = (status, id) => {
    if (status === "stopped") {
      startInstance(id);
    } else {
      stopInstance(id);
    }
  };
  return (
    <div className="instance__detail__container">
      <div>
        <Typography variant="h6">Instances</Typography>
      </div>
      <div className="instance__table">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="left">Instance Name</StyledTableCell>
                <StyledTableCell align="right">Cost Per Hour</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instances.map((instance) => (
                <StyledTableRow key={instance.id}>
                  <StyledTableCell component="th" scope="row">
                    {instance.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {instance.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {isUSD
                      ? `$ ${instance.costPerHour}`
                      : `₹ ${(instance.costPerHour * 72.96).toFixed(2)}`}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {instance.status}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{
                      color:
                        instance.status === "stopped" ? "#004F3D" : "#ff8154",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      actionOnInstance(instance.status, instance.id)
                    }
                  >
                    <b>{instance.status === "stopped" ? "start" : "stop"}</b>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TableComponent;
