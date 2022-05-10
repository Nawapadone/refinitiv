import React, {
  useState, useEffect
} from "react";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import './App.css';

function App() {

  let [search, setSearch] = useState('')
  let [data, setData] = useState({})
  let [result, setResult] = useState({})

  useEffect(() => {
    getData()
    return () => {
      // before unmount, clean up
      // ...
    }

  }, [])

  const getData = async() =>{
    try {
      let {data} = await axios.get(`https://api.publicapis.org/categories`)
      setData(data)
      setResult(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event, name) => {
    switch (name) {
      case 'search':
        setSearch(event)
        if(event){
          matchData()
        }else{
          setResult(data) 
        }
        break;
      default:
        break;
    }
  }

  const matchData = () => {
    let res = []
    res = data.categories.filter((data, index) => {
      if (data.toLowerCase().match(search.toLowerCase())) {return data}
    })
    setResult({...data,count:res.length,categories:res})
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className="App">
      <div className="search-box">
        <TextField size="small" value={search} onChange={(event) => { handleChange(event.target.value.toString(), 'search') }} placeholder="filter" variant="outlined" />
      </div>
      <div className="table-categories">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Categories</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result && result.count > 0 ? result.categories.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{row}</StyledTableCell>
                </StyledTableRow>
              )) :
                <StyledTableRow>
                  <StyledTableCell align="center">ไม่พบข้อมูล</StyledTableCell>
                </StyledTableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
