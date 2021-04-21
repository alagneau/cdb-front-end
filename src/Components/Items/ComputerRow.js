import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function ComputerRow(props) {
  
  const { isItemSelected, labelId, companies } = props;
  const [editMode, setEditMode] = useState(false);
  const [row, setRow] = useState(props.row);
  const [name, setName] = useState(props.row.name);
  const [introduced, setIntroduced] = useState(props.row.introduced);
  const [discontinued, setDiscontinued] = useState(props.row.discontinued);
  const [companyId, setCompanyId] = useState(props.row.company_id);
  const [companyName, setCompanyName] = useState(props.row.company_name);

  

  const handleEditButtonCLicked = (event) => {
    event.stopPropagation();
    setEditMode(!editMode)
  }


  const handleEditRow = (event) => {
    setEditMode(!editMode);
    let rowEdited = {
      id: row.id,
      name: name,
      introduced: introduced,
      discontinued: discontinued,
      company_id: companyId,
      company_name: companyName
    }
    setRow(rowEdited);
    props.handleEdit(rowEdited);
  }


  const handleClickRow = (event) => {
    if ( !editMode ) {
      props.handleClick(event, row.id);
    }
  }

  return (
    <TableRow
      hover
      onClick={handleClickRow}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
    >

      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>


      <TableCell component="th" align='left' id={labelId} scope="row" padding="none">
        {editMode
          ? <TextField 
              required
              defaultValue={name} 
              onChange={(event) => setName(event.target.value)}
            />
          : row.name
        }
      </TableCell>


      <TableCell align="left">
        {editMode
          ? <TextField 
              type="date" 
              defaultValue={introduced} 
              onChange={(event) => setIntroduced(event.target.value)}
            />
          : row.introduced
        }
      </TableCell>
      

      <TableCell align="left">
        {editMode 
          ? <TextField 
              type="date"
              defaultValue={discontinued} 
              onChange={(event) => setDiscontinued(event.target.value)} 
            />
          : row.discontinued
        }
      </TableCell>
      

      <TableCell align="left">
        {editMode
          ? <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty={true}
              autoWidth={true}
              onChange={(event) => { setCompanyId(event.target.value.id); setCompanyName(event.target.value.name); }}
            >
              {companies.map( (company, index) => {
                return (<MenuItem value={company}>{company.name}</MenuItem>);
              })}
            </Select>
          : row.company_name
        }
      </TableCell>


      <TableCell padding="checkbox">
        {editMode 
          ? <ButtonGroup color="primary">
              <Button onClick={handleEditRow}>OK</Button>
              <Button onClick={handleEditButtonCLicked}>CANCEL</Button>
            </ButtonGroup>
          : <EditIcon onClick={handleEditButtonCLicked}/>
        }
      </TableCell>

    </TableRow>
    );
}

ComputerRow.propTypes = {
    row: PropTypes.object.isRequired,
    isItemSelected: PropTypes.bool.isRequired,
    labelId: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    companies: PropTypes.array.isRequired
}