import { View } from './components/uiComponent';
import { Data }  from './components/fetchApiData';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, 
  TableCell, Paper, Typography, Grid, Stack} from '@mui/material';
import { BrowserRouter,Routes, Route, Link, NavLink } from 'react-router-dom';
import { StyleSheet } from './components/styleSheet';
import appState from './components/appState';

function App() {
  Data();
  const useStyles = StyleSheet();

  return (
    <Paper sx={useStyles.paper} elevation={0} variant="outlined" square>
      <BrowserRouter>
        <Stack spacing={4} direction='row' mb={2} ml={3}>
          <NavLink  to={"/"} 
            style={({ isActive }) => ({color: isActive ? '#004FB4' : '#A4B8D3', textDecoration: 'none'})}>
            <Typography variant='h5'>My shifts</Typography>
          </NavLink>
          <NavLink to={`/available_shifts`} 
            style={({ isActive }) => ({color: isActive ? '#004FB4' : '#A4B8D3', textDecoration: 'none'})}>
            <Typography variant='h5'>Available shifts</Typography>
          </NavLink>
        </Stack>
       
        <Routes>
          <Route path={"/"} element={<View />} />
          <Route path={"/available_shifts/*"} element={<View />} />
        </Routes>
      </BrowserRouter>
    </Paper>    
  )
    

}
export default App;
