import create from 'zustand';

const appState = create(set => ({
    arrayState: [], arrayStateForAvailableShifts: [], stateAvailableShifts: [],  placesInHeaderForAvailableShifts: [],
    uniqueDates: [], uniqueDatesForAvailableShifts: [], datesAvailableShifts: [], 
    dataObject: {}, dataObjectForAvailableShifts: {}, bodyAvailableShifts: {},


    insertStateAvailableShifts: (array: any)=> set((state:any)=> ({
        stateAvailableShifts: [...array]
    })),

    insertBodyAvailableShifts: (body: any[])=> set((state:any)=> ({
        bodyAvailableShifts: {...body}
    })),

    updateStateAvailableShifts: (dateDigit: number, cityDigit: number,  valueDigit: number) => set((state: any) => ({
        stateAvailableShifts: [...state.stateAvailableShifts.map((element:any,indexDate:number) => {
            return [...element.map((ele:any, indexCity:number) => {
               return [...ele.map((e:any, indexValue:number) => {
                  return  (indexValue == valueDigit && indexCity == cityDigit 
                    && indexDate == dateDigit) && ([e = true] && e) || e;
                })]
            })]
        })]
    })),

    insertState: (array: any[])=> set((state:any)=> ({
        arrayState: [...array]
    })),

    updateArrayState: (index1: number, index2: number) => set((state: any) => ({
        arrayState: [ ...state.arrayState.map((ele: any[], index: number)=> {
            return index == index1 && ((ele[index2] = true) && ele) || ele
        })]
    })),

    insertUniqueDates: (uniqueDatesArray: any[])=> set((state:any)=> ({
        uniqueDates: [...uniqueDatesArray]
    })),

    insertDataObject: (dataObject: {})=> set((state:any)=> ({
        dataObject: {...dataObject}
    })),

    insertStateForAvailableShifts: (array: any[])=> set((state:any)=> ({
        arrayStateForAvailableShifts: [...array]
    })),

    updateArrayStateForAvailableShifts: (index1: number, index2: number) => set((state: any) => ({
        arrayStateForAvailableShifts: [ ...state.arrayStateForAvailableShifts.map((ele: any[], index: number)=> {
            return index == index1 && ((ele[index2] = true) && ele) || ele
        })]
    })),

    insertUniqueDatesForAvailableShifts: (uniqueDatesArray: any[])=> set((state:any)=> ({
        uniqueDatesForAvailableShifts: [...uniqueDatesArray]
    })),

    insertDataObjectForAvailableShifts: (dataObject: {})=> set((state:any)=> ({
        dataObjectForAvailableShifts: {...dataObject}
    })),

    insertPlacesInHeaderForAvailableShifts: (array: any[])=> set((state:any)=> ({
        placesInHeaderForAvailableShifts: [...array]
    })),

}))

export default appState
