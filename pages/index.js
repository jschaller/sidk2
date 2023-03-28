import { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  TableSortLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { CenterFocusStrong } from "@mui/icons-material";

export default function Ping() {
  const [subnet, setSubnet] = useState("");
  const [results, setResults] = useState([]);
  const [cidr, setCidr] = useState("24");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`/api/ping?subnet=${subnet}/${cidr}`);
    const sortedResults = response.data.sort((a, b) => {
        const ipA = a.address.split(".").reduce((acc, val) => {
          return acc * 256 + parseInt(val, 10);
        }, 0);
        const ipB = b.address.split(".").reduce((acc, val) => {
          return acc * 256 + parseInt(val, 10);
        }, 0);
        return ipA - ipB;
      });
    setResults(sortedResults);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Ping App
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 2,
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "20%" }}>
          
          <TextField
            label="Subnet"
            variant="outlined"
            size="small"
            value={subnet}
            onChange={(event) => setSubnet(event.target.value)}
            sx={{ mr: 1, mb:1}}
          />
        <Select 
          label="Subnet Mask" 
          value={cidr}
          variant="outlined"
          size="small"
          onChange={(event) => setCidr(event.target.value)}
          sx={{ mr: 1, mb:1}}>
            <MenuItem value={30}>255.255.255.252 /30</MenuItem>
            <MenuItem value={29}>255.255.255.248 /29</MenuItem>
            <MenuItem value={28}>255.255.255.240 /28</MenuItem>
            <MenuItem value={27}>255.255.255.224 /27</MenuItem>
            <MenuItem value={26}>255.255.255.192 /26</MenuItem>
            <MenuItem value={25}>255.255.255.128 /25</MenuItem>
            <MenuItem value={24}>255.255.255.0 /24</MenuItem>
            <MenuItem value={23}>255.255.254.0 /23</MenuItem>
            <MenuItem value={22}>255.255.252.0 /22</MenuItem>
            <MenuItem value={21}>255.255.248.0 /21</MenuItem>
            <MenuItem value={20}>255.255.240.0 /20</MenuItem>
            <MenuItem value={19}>255.255.224.0 /19</MenuItem>
            <MenuItem value={18}>255.255.192.0 /18</MenuItem>
            <MenuItem value={17}>255.255.128 /17</MenuItem>
            <MenuItem value={16}>255.255.0.0 /16</MenuItem>
            <MenuItem value={15}>255.254.0.0 /15</MenuItem>
            <MenuItem value={14}>255.252.0.0 /14</MenuItem>
            <MenuItem value={13}>255.248.0.0 /13</MenuItem>
            <MenuItem value={12}>255.240.0.0 /12</MenuItem>
            <MenuItem value={11}>255.224.0.0 /11</MenuItem>
            <MenuItem value={10}>255.192.0.0 /10</MenuItem>
            <MenuItem value={9}>255.128.0.0. /9</MenuItem>
            <MenuItem value={8}>255.0.0.0 /8</MenuItem>
            <MenuItem value={7}>254.0.0.0 /7</MenuItem>
            <MenuItem value={6}>252.0.0.0 /6</MenuItem>
            <MenuItem value={5}>248.0.0.0 /5</MenuItem>
            <MenuItem value={4}>240.0.0.0 /4</MenuItem>
            <MenuItem value={3}>224.0.0.0 /3</MenuItem>
            <MenuItem value={2}>192.0.0.0 /2</MenuItem>
            <MenuItem value={1}>128.0.0.0 /1</MenuItem>
        </Select>
        </Box>
        <Button type="submit" variant="contained">
          Ping
        </Button>
      </Box>
      {results.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 650, mx: "auto"}}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Ping Results
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ /*minWidth: 650,*/ }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "30%" }}>Address</TableCell>
                  <TableCell sx={{ width: "20%" }}>Status</TableCell>
                  <TableCell sx={{ width: "20%" }}>Response Time (ms)</TableCell>
                  <TableCell sx={{ width: "30%" }}>Hostname</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result,index) => (
                  <TableRow key={result.address} sx={{ bgcolor: index % 2 === 0 ? "background.paper" : "action.hover" }}>
                    <TableCell>{result.address}</TableCell>
                    <TableCell>
                      <Typography sx={{ color: result.alive ? "green" : "red"}}>
                        {result.alive ? "Alive" : "Dead"}
                      </Typography>
                    </TableCell>
                    <TableCell>{result.time !== undefined ? result.time : "-"}</TableCell>
                    <TableCell>{result.hostname}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
