import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchBar from "material-ui-search-bar";
import ComputerRow from '../Items/ComputerRow';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';



function createData(computer) {
  return { 
    id: computer.id,
    name: computer.name, 
    introduced: computer.introduced, 
    discontinued: computer.discontinued, 
    company_id: computer.company === null ? null : computer.company.id,
    company_name: computer.company === null ? null : computer.company.name
 };
}


const urlComputer = 'http://localhost:8080/webapp/APIComputer';
const urlCompany = 'http://localhost:8080/webapp/APICompany';




// function descendingComparator(a, b, orderBy) {
//   const elem1 = orderBy === 'introduced' || orderBy === 'discontinued'
//                 ? new Date(a[orderBy])
//                 : a[orderBy];

//   const elem2 = orderBy === 'introduced' || orderBy === 'discontinued'
//                 ? new Date(b[orderBy])
//                 : b[orderBy];

//   if (elem2 < elem1 || elem1 === null) {
//     return -1;
//   }
//   if (elem2 > elem1 || elem2 === null) {
//     return 1;
//   }
//   return 0;
// }




// function getComparator(order, orderBy) {

//   return order === 'desc'
//   ? (a, b) => descendingComparator(a, b, orderBy)
//   : (a, b) => -descendingComparator(a, b, orderBy);
// }




// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }




const headCells = [
  { id: 'name', disablePadding: true, label: 'Computer Name' },
  { id: 'introduced', disablePadding: false, label: 'Introduced Date' },
  { id: 'discontinued', disablePadding: false, label: 'Discontinued Date' },
  { id: 'company_name', disablePadding: false, label: 'Company' },
];




// const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);




function EnhancedTableHead(props) {
  
  
  const { classes, onSelectAllClick, order, orderBy, 
          numSelected, rowCount, onRequestSort, setOrderBy, setOrder } = props;
  
  
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };



  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left' 
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <Button size="small" color="primary" onClick={() => { setOrderBy(); setOrder('asc'); }}>RESET_ORDER</Button> 
        </TableCell>
      </TableRow>
    </TableHead>
  );

}


EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};





const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));





const EnhancedTableToolbar = (props) => {

  const classes = useToolbarStyles();
  const { numSelected, handleDelete, handleSearch } = props;

  const [search, setSearch] = useState("");


  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Computers
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        </Tooltip>
      ) : ( 
        <div>
          <SearchIcon onClick={() => handleSearch(search)} />
          <TextField onChange={(newValue) => setSearch(newValue)} />
        </div>
      )
      }
    </Toolbar>
  );
};


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};






const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));





export default function EnhancedTable() {

  const token = localStorage.getItem('access_token');

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [selected, setSelected] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState();
  const [companies, setCompanies] = useState([]);


  const getCompanies = () => {
    fetch(`${urlCompany}/list`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then( data => data.json() )
      .then( result =>  setCompanies(result) );
  }



  useEffect(() => {
    getComputerCount();
  }, [])

  useEffect(() => {
    getCompanies();
  }, [])




  useEffect(() => {
    if ( typeof orderBy === 'undefined' ) {
      getApiList();
    }
    else {
      getSortedApiList();
    }
  }, [pageNumber, rowsPerPage])





  useEffect(() => {
    setPageNumber(0);
    if ( typeof orderBy === 'undefined' ) {
      getApiList();
    }
    else {
      getSortedApiList();
    }
  }, [orderBy, order])





  const getApiList = () => {
    fetch(`${urlComputer}/page/${pageNumber}/${rowsPerPage}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(data => data.json())
        .then(
            (result) => {
              let newRows = [];
              result.map( computer => newRows.push(createData(computer)) );
              setRows(newRows);
            }
        );
  }





  const getComputerCount = () => {
    fetch(`${urlComputer}/count`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then( data => data.json() )
    .then( result => setTotalRows( result ) );
  }





  const getSortedApiList = () => {
    
    let sort = order === 'asc' ? 'ASC' : 'DESC';
    let orderField = orderBy === 'company_name' ? 'company' : orderBy;

    fetch(`${urlComputer}/order/page/${pageNumber}/${rowsPerPage}?orderField=${orderField}&sort=${sort}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then( data => data.json() )
    .then( result => {
      let newRows = [];
      result.map( computer => newRows.push(createData(computer)) );
      setRows(newRows);
    });
  }




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };




  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };




  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };



  const handleChangePage = (event, newPageNumber) => {
    setPageNumber(newPageNumber);
  };




  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };




  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };



  const isSelected = (id) => selected.indexOf(id) !== -1;




  // TO CHANGE
  const handleDelete = () => {
    console.log(selected);

    if ( selected !== [] ) {
      selected.map( id => {
        fetch(`${urlComputer}/delete?id=${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        let copyRows = [...rows];
        copyRows.splice(copyRows.indexOf(rows.find(row => row.id === id)), 1);
        setRows(copyRows);
      });
      setSelected([]);

      if ( typeof orderBy === 'undefined' ) {
        getApiList();
      }
      else {
        getSortedApiList();
      }
    }
  }




  const handleEdit = (rowEdited) => {
    console.log('Inside edit');
    console.log(rowEdited);
    
    let company = null;
    if ( rowEdited.company_id !== null && rowEdited.company_name !== null ) {
      console.log('company creation');
      company = { 
        id: rowEdited.company_id, 
        logo: null,
        name: rowEdited.company_name 
      }; 
    }

    fetch(`${urlComputer}/update`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: company,
        discontinued: rowEdited.discontinued,
        id: rowEdited.id,
        introduced: rowEdited.introduced,
        name: rowEdited.name
      })
    }).then( result => console.log(result) );

    if ( typeof orderBy === 'undefined' ) {
      getApiList();
    }
    else {
      getSortedApiList();
    }
  }



  const handleSearch = (search) => {

    console.log(search.target.value);

    let urlSearch = `${urlComputer}/search`;

    if (typeof orderBy !== 'undefined') {
      urlSearch = urlSearch.concat(`/order/page`); 
    }
    else {
      urlSearch = urlSearch.concat(`/page`);
    }

    urlSearch = urlSearch.concat(`/${pageNumber}/${rowsPerPage}?search=${search.target.value}`);

    fetch(urlSearch, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
    })
    .then((data) => data.json() )
    .then((result) => {
      console.log('result');
      console.log(result);
      let searchedRows = [];
      result.map( computer => searchedRows.push(createData(computer)) );
      setRows(searchedRows);
    });
  }



  return (
    <div align="left" className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} 
                              handleDelete={handleDelete}
                              handleSearch={handleSearch} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"handleClickhandleClick
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              setOrderBy={setOrderBy}
              setOrder={setOrder}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                          <ComputerRow key={row.name}
                            row={row}
                            companies={companies}
                            isItemSelected={isItemSelected}
                            labelId={labelId}
                            handleClick={handleClick}
                            handleEdit={handleEdit} />
                );
              })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={pageNumber}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
