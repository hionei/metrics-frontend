import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Avatar } from "@mui/joy";
import { truncateString } from "../../../utils/helpers";
import { Badge } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FTSODialog from "./FTSODialog";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "logo",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "successRate",
    numeric: true,
    disablePadding: true,
    label: "Success Rate (%)",
  },
  {
    id: "curRewardRate",
    numeric: true,
    disablePadding: true,
    label: "Reward Rate",
  },
  {
    id: "prev_reward_rate",
    numeric: true,
    disablePadding: true,
    label: "Prev Reward Rate",
  },
  {
    id: "balance",
    numeric: true,
    disablePadding: true,
    label: "Balance",
  },
  {
    id: "availability",
    numeric: true,
    disablePadding: true,
    label: "Availability",
  },
  {
    id: "totalEpochReward",
    numeric: true,
    disablePadding: true,
    label: "Total Reward",
  },
  {
    id: "currentEpochReward",
    numeric: true,
    disablePadding: true,
    label: "Current Earning",
  },
  {
    id: "currentVotePower",
    numeric: true,
    disablePadding: true,
    label: "Current Vote Power",
  },
  {
    id: "currentDelegation",
    numeric: true,
    disablePadding: true,
    label: "Current Delegation",
  },
  {
    id: "lockedVotePower",
    numeric: true,
    disablePadding: true,
    label: "Locked Vote Power",
  },
  {
    id: "lockedDelegation",
    numeric: true,
    disablePadding: true,
    label: "Locked Delegation",
  },
  {
    id: "whitelist",
    numeric: true,
    disablePadding: true,
    label: "Whitelist",
  },
  {
    id: "fee",
    numeric: true,
    disablePadding: true,
    label: "Fee",
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({ rows, totalVotePower }) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("successRate");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(200);
  const [dlgStatus, setDlgStatus] = React.useState(false);
  const [selectedProviderInfo, setSelectedProviderInfo] = React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    }

    const selectedProvider = visiRows.filter((row) => {
      return row.id == id;
    });

    setSelectedProviderInfo(selectedProvider[0]);
    setDlgStatus(true);
    setSelected(newSelected);
  };

  const parentHandleClose = () => {
    setDlgStatus(false);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visiRows = React.useMemo(() => {
    return stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, rows]);

  return (
    <Box sx={{ width: "100%", overflowX: "initial" }}>
      <FTSODialog status={dlgStatus} parentHandleClose={parentHandleClose} providerInfo={selectedProviderInfo} />
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ overflowX: "initial" }}>
          <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visiRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">{index + 1}</TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <Badge
                        badgeContent={
                          row?.listed ? (
                            <DoneAllIcon sx={{ fontSize: 18 }} color="success" />
                          ) : (
                            <WarningAmberIcon sx={{ color: "#ff9100", fontSize: 18 }} />
                          )
                        }
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        overlap="circular"
                      >
                        <Avatar src={row.logoURI} />
                      </Badge>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {truncateString(row.address, 8)}
                    </TableCell>
                    <TableCell align="right">{Number(row?.successRate)}%</TableCell>
                    <TableCell align="right">{row?.curRewardRate}</TableCell>
                    <TableCell align="right">{row?.prevRewardRate}</TableCell>
                    <TableCell align="right">{Number(Number(row?.balance).toFixed(2)).toLocaleString()}</TableCell>
                    <TableCell align="right">{row?.availability}%</TableCell>
                    <TableCell align="right">{Number(row?.totalEpochReward).toLocaleString()}</TableCell>
                    <TableCell align="right">{Number(row?.currentEpochReward).toLocaleString()}</TableCell>
                    <TableCell align="right">{Number(row?.currentVotePower).toLocaleString()}</TableCell>
                    <TableCell align="right">
                      {returnColorDom(Number((Number(row?.currentVotePower) / Number(totalVotePower)) * 100).toFixed(2))}
                    </TableCell>
                    <TableCell align="right">{Number(row?.lockedVotePower).toLocaleString()}</TableCell>
                    <TableCell align="right">
                      {returnColorDom(Number((Number(row?.lockedVotePower) / Number(totalVotePower)) * 100).toFixed(2))}
                    </TableCell>
                    <TableCell align="right">{Object.keys(row?.whitelist).length}</TableCell>
                    <TableCell align="right">
                      {Number(row?.fee.fee) / 100}% <br />
                      {row?.fee.scheduledFee.length > 0 &&
                        row?.fee.scheduledFee.map((feeInfo, index) => {
                          return (
                            <span key={"fee" + index}>
                              ({Number(feeInfo.fee) / 100}% from {feeInfo.from}) &nbsp;
                            </span>
                          );
                        })}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

const returnColorDom = (value) => {
  if (value > 2.5) return <span className="text-red-600">{value}%</span>;
  if (value >= 2.0 && value <= 2.5) return <span className="text-yellow-600">{value}%</span>;
  if (value < 2.0) return <span className="text-green-800">{value}%</span>;
};
