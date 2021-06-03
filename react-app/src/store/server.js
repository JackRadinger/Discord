
//Action Verbs

// const SET_STOCK = 'stock/setStock'



//Action Creater

// const setStocks = (stock) => {
//     return {
//         type: SET_STOCK,
//         stock
//     }
// }




//Thunk
// export const getStockCompany = (symbol) => async (dispatch) => {
//     const response = await fetch(`/api/stock/companyinfo/${symbol}`)
//     if(response.ok) {
//         const companyInfo = await response.json();
//         dispatch(setStocks(companyInfo))
//     }
// }



// Reducer
const initialState = {};

const serverReducer = (state = initialState, action) => {
    let newerState;
    switch (action.type) {
        // case SET_STOCK:
        //     newerState = { ... state }
        //     newerState.currentStock = action.stock

        //     return newerState

        default:
            return state;
    }
};

export default serverReducer;
