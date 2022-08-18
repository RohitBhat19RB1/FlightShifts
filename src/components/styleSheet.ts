export const StyleSheet = () => {  
    const useStyles = {
        table: {
            minWidth: '80%'
        },
        tableContainer: {
            borderRadius: 2, 
            maxWidth: '80%'
        },
        paper: {
            margin: [4,4,4,4], 
            paddingTop: '4%', 
            paddingLeft: '15%', 
            paddingBottom: '4%', 
            backgroundColor: '#F1F4F8' 
        },
        tableHeaderCell: {
            fontStyle: 'roboto', 
            fontSize: 'large', 
            fontWeight: 'bold', 
            padding: '10px', 
            marginLeft: '30px', 
            backgroundColor: '#F7F8FB', 
            color: '#4F6C92'
        },
        button: {
            borderRadius: 20, 
            width: 110, 
            borderColor: '#E2006A', 
            textTransform: 'capitalize', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            fontFamily:'sans-serif'
        },
        time: {
            lineHeight: '1.0', 
            color:'#4F6C92'
        },
        showCityHeader: {
            lineHeight: '1.5', 
            color:'#4F6C92'
        },
        gridContainer: {
            display:"flex", 
            alignItems:"center"
        }
    };
    return useStyles;
}
