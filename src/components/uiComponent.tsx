import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';  
import { useLocation,NavLink, Routes, Route } from 'react-router-dom';
import { StyleSheet } from './styleSheet';
import appState from './appState';

const useStyles = StyleSheet();

export function View() {
  const location = useLocation();
  let cityNameEndPoint:string;

  const myShiftsHeaders = appState((state:any) => state.uniqueDates);
  const myShiftsBody = appState((state:any) => state.dataObject);
  const stateMyShifts = appState((state:any) => state.arrayState);
  const updateMyShifts = appState((state:any) => state.updateArrayState);

  const availableShiftsHeaders = appState((state:any) => state.uniqueDatesForAvailableShifts);
  const availableShiftsBody = appState((state:any) => state.bodyAvailableShifts);
  const stateAvailableShifts = appState((state:any) => state.stateAvailableShifts);
  const updateAvailableShifts = appState((state:any) => state.updateStateAvailableShifts);

  const cityHeader = appState((state:any) => state.placesInHeaderForAvailableShifts);

  const showCityHeader = location.pathname != '/';
  !!showCityHeader && (cityNameEndPoint = (location.pathname.split('/')[2] || 
  ([location.pathname = `${location.pathname}/${cityHeader[0]}`] && `${cityHeader[0]}`)))

  let [headData, bodyData, state, updateState] = showCityHeader? 
    [availableShiftsHeaders, availableShiftsBody, stateAvailableShifts, updateAvailableShifts] :
    [myShiftsHeaders, myShiftsBody, stateMyShifts, updateMyShifts]

  const selectParticularTable = (HeaderValue:string) => {
      return showCityHeader? bodyData[HeaderValue][cityNameEndPoint] : bodyData[HeaderValue]
    }

  const selectParticularState = (dateIndex:number, valueIndex:number) => {
      let cityIndex = showCityHeader? cityHeader.indexOf(cityNameEndPoint) : null
      return showCityHeader? state[dateIndex][cityIndex][valueIndex] : state[dateIndex][valueIndex]
  }

  const updateParticularState = (dateIndex:number, valueIndex:number) => {
      let cityIndex = showCityHeader? cityHeader.indexOf(cityNameEndPoint) : null
      return showCityHeader? updateState(dateIndex, cityIndex, valueIndex) : updateState(dateIndex,valueIndex)
  }
   
  return (
  <TableContainer component={Paper} sx={useStyles.tableContainer} elevation={4}>
  {  
    showCityHeader?
    <Table>
        <TableHead>
            <TableRow >
            {
              cityHeader.map((city:string,indexCity:number) => (
                  <TableCell align="center" key={city}>
                      <NavLink to={`${city}`} style={({ isActive }) => ({color: isActive ? '#004FB4' : '#A4B8D3', textDecoration: 'none'})}>
                        <Typography variant='h6'>{city}</Typography>
                      </NavLink>
                  </TableCell>
               ))
            }
            </TableRow>
        </TableHead>
    </Table>
    : null
  }
  {
    <Routes>
        <Route path={"/"} element={DataTable(headData, selectParticularState, selectParticularTable, updateParticularState) } />
        {
            cityHeader.map((city:string, index:number) => (
                <Route key={index} path={city} element={DataTable(headData, selectParticularState, selectParticularTable, updateParticularState) } />
            ))
        }
    </Routes>
   }
 </TableContainer>
  )
}

function DataTable(headData:any[], state:any, particularTable:any, updateState:any){
    const useStyles = StyleSheet();
    return(
        headData.map((HeaderValue:string, uniIndex:number) => (
            <Table aria-label='simple table' key={HeaderValue}>
                { 
                    !!particularTable(HeaderValue).length ?
                    <TableHead>
                        <TableRow>
                            <TableCell sx={useStyles.tableHeaderCell} >
                                <Grid container>
                                    <Typography variant='h6' fontFamily={'system-ui'}>&ensp;&nbsp;{HeaderValue}</Typography>
                                    <Typography marginTop={'7px'} color='#A4B8D3'>&emsp;{particularTable(HeaderValue).length} shifts</Typography>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    : null
                }
                <TableBody>
                { 
                  particularTable(HeaderValue).map((row:any,index:number) => (
                      <TableRow key={row.id} >
                          <TableCell style={{padding: '13px'}} >
                              <Grid container spacing={2} style={useStyles.gridContainer}>
                                  <Grid item xs={10}>
                                      <Typography variant='h6' style={useStyles.time}>&ensp;{`${row.bTime} - ${row.eTime}`}</Typography>
                                      <Typography color='#A4B8D3'>&ensp;&nbsp;{row.area}</Typography>
                                  </Grid>
                                  <Grid item xs={2}>
                                      <LoadingButton sx={useStyles.button} style={{color: state(uniIndex, index) ? 'transparent' : '#E2006A'}} 
                                      loading={state(uniIndex, index)} 
                                      onClick={()=> {updateState(uniIndex, index)}} variant='outlined'>Cancel</LoadingButton>
                                  </Grid>
                              </Grid>
                          </TableCell>
                      </TableRow>
                   ))
                }
                </TableBody>
            </Table>
        ))
    )
}