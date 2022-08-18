import { useEffect, useState } from 'react';
import appState from './appState';

export function Data (){
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/shifts").then((result) => {
      result.json().then((response) => {
        setApiData(response);
      })
    })
  }, []);
 
  const getMonthForDate = (date: number) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months[date];
  }

  const timeTransform = (value: number) => {
    let time = new Date(value);
    let [hours, minutes, date, month] = 
    [time.getHours().toString(), time.getMinutes().toString(), time.getDate().toString(), getMonthForDate(time.getMonth())];

    if(minutes.length == 1) minutes = `0${minutes}`;
    return [`${hours}:${minutes}`, `${month} ${date}`];
  }
  
  let formatData = apiData.map(element => {
    let [beginTime, endTime] = [timeTransform(element.startTime), timeTransform(element.endTime)];
    [element.bTime, element.date, element.eTime] = [beginTime[0], beginTime[1], endTime[0]];
    return {...element};
  });

  let arrayOfIds = ["8a847c16-9244-46cd-b11a-c4a68cf46e58", "a05999a0-3d41-42c1-b48d-26a4fdbfadc6", 
  "d344baf5-7ae6-48f1-be2d-919e57e1a62c", "238c9aed-e7aa-41ae-8c60-d945832c3651", "702618f5-1f4d-46cc-b283-130edc2b256e"]

  //As api is not providing any flight data where:   booked = true. 
  //therefore manually doing the needful to get the fully functional app for all use cases
  let formatedDataWithSomeTrueValues = formatData.map((element:any,index:number) => 
    arrayOfIds.includes(element.id) && ((element.booked = true) && element) || element
  );

  let placesInHeaderForAvailableShifts = Array.from(new Set([...formatData.map(element => element.area)]));

  let myShiftsData = formatedDataWithSomeTrueValues.filter(
    (element:any,index:number) => element.booked == true && element
  );

  const uniqueDates = Array.from(
    new Set([...myShiftsData.map(element => element.date)])
  );

  const uniqueDatesForAvailableShifts = Array.from(
    new Set([...formatedDataWithSomeTrueValues.map(element => element.date)])
  );

  let dataObject:any = {};
  uniqueDates.forEach((element:any) => {
    let dataObjectEntities = {[element]: []};
    dataObject = {...dataObject, ...dataObjectEntities};
  });

  let dataObject1:any = {};
  uniqueDatesForAvailableShifts.forEach((element:any) => {
    let dataObjectEntities1 = {[element]: []};
    dataObject1 = {...dataObject1, ...dataObjectEntities1};
  });

  let dataObjForTotalShifts:any = {};
  //let FinalState:any={}
  uniqueDatesForAvailableShifts.forEach((element:any) => {
    let dataObj = {[element]: {}};
    dataObjForTotalShifts = {...dataObjForTotalShifts, ...dataObj};
   // FinalState = {...FinalState, ...dataObj}
  });
 
  Object.keys(dataObjForTotalShifts).forEach((date,dateIndex) => {
    placesInHeaderForAvailableShifts.forEach((area, areaIndex) => {
      let dataObj = {[area]: []}, stateElement = {[area]: []};
      dataObjForTotalShifts[date] = {...dataObjForTotalShifts[date], ...dataObj}; 
    //  FinalState[date] = {...FinalState[date], ...stateElement};
    })
  })

  uniqueDatesForAvailableShifts.forEach((date,dateIndex) => {
    placesInHeaderForAvailableShifts.forEach((place, placeIndex) => {
      formatedDataWithSomeTrueValues.forEach((element, elementIndex) => {
        element.date == date && element.area == place && 
        (dataObjForTotalShifts[date][place].push(element) 
        //  && FinalState[date][place].push(false)
        )
      })
    })
  })

  let FinalState = [...Object.values(dataObjForTotalShifts).map((element:any,index1:number) => {
            return [...Object.values(element).map((ele:any) => {
               return [...Object.values(ele).map((e:any) => {
                  return  e = false;
                })]
            })]
        })]
// ------------------------------------------------------------------------------------
  //  console.log("****==dataObj==>>>>>", {...dataObjForTotalShifts});//new dataobject for available shifts 
  //  console.log("***==StateArray==>>>>>", FinalState);
// ========================================================================================
  let tableState:any[] = [];
  let iterableObject = Object.keys(dataObject);

  iterableObject.forEach((value,index) => {
    myShiftsData.forEach((element:any) => element.date == value && dataObject[value].push(element));
    tableState[index] = [...new Array(dataObject[value].length).fill(false)]; 
  });

  let tableState1:any[] = [];
  let iterableObject1 = Object.keys(dataObject1);

  iterableObject1.forEach((value,index) => {
    formatedDataWithSomeTrueValues.forEach((element:any) => element.date == value && dataObject1[value].push(element));
    tableState1[index] = [...new Array(dataObject1[value].length).fill(false)]; 
  });

  const insertStateAvailableShifts = appState((state:any) => state.insertStateAvailableShifts);
  insertStateAvailableShifts(FinalState);

  const insertArrayStateToStore = appState((state:any) => state.insertState);
  insertArrayStateToStore(tableState);

  const insertUniqueDatesToStore = appState((state:any) => state.insertUniqueDates);
  insertUniqueDatesToStore(uniqueDates);

  const insertDataObjectToStore = appState((state:any) => state.insertDataObject);
  insertDataObjectToStore(dataObject);

  const insertArrayStateForAvailableShiftsToStore = 
  appState((state:any) => state.insertStateForAvailableShifts);
  insertArrayStateForAvailableShiftsToStore(tableState1);

  const insertUniqueDatesForAvailableShiftsToStore = 
  appState((state:any) => state.insertUniqueDatesForAvailableShifts);
  insertUniqueDatesForAvailableShiftsToStore(uniqueDatesForAvailableShifts);

  const insertDataObjectForAvailableShiftsToStore = 
  appState((state:any) => state.insertDataObjectForAvailableShifts);
  insertDataObjectForAvailableShiftsToStore(dataObject1);

  const insertplacesInHeaderForAvailableShifts = 
  appState((state:any) => state.insertPlacesInHeaderForAvailableShifts);
  insertplacesInHeaderForAvailableShifts(placesInHeaderForAvailableShifts);

  const insertBodyForAvailableShifts = appState((state:any) => state.insertBodyAvailableShifts);
  insertBodyForAvailableShifts(dataObjForTotalShifts);

}