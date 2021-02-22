const initialState = {
    currentStore: null,
    status: 'loading',
    error: null,
    sort: 'default',
    filters: {
            price: {id:'0', value: 'default', label: 'all prices'},
            body_location: {
                0:{ 
                id:0,                
                value: 'arms',     
                label: 'Arms',               
                isChecked: false
                },
                1:{ 
                    id:1,                 
                    value: 'chest',    
                    label: 'Chest',              
                    isChecked: false
                },
                2:{      
                    id:2,            
                    value: 'feet',    
                    label: 'Feet',           
                    isChecked: false
                },
                3:{     
                    id:3,            
                    value: 'hands',    
                    label: 'Hands',               
                    isChecked: false
                },
                4:{  
                    id:4,                
                    value: 'head',    
                    label: 'Head',               
                    isChecked: false
                },
                5:{   
                    id:5,            
                    value: 'neck',    
                    label: 'Neck',               
                    isChecked: false
                },
                6:{   
                    id:6,              
                    value: 'torso',    
                    label: 'Torso',               
                    isChecked: false
                },
                7:{ 
                    id:7,               
                    value: 'waist',    
                    label: 'Waist',               
                    isChecked: false
                },
                8:{  
                    id:8,                  
                    value: 'wrist',    
                    label: 'Wrist',              
                    isChecked: false
                }
            }
    },   
};

export default function storeReducer(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_STORE_INFO': {
            return {
                ...state,
                status: "loading",
                error: null
            };
        }
        case 'RECEIVE_STORE_INFO': {
            return {
                ...state,
                currentStore: {
                    ...state.currentStore,
                    bodyLocation: {...action.store.bodyLocation},
                    store: [...action.store.items]                 
                }, 
                status: "idle"
            };
        }
        case 'RECEIVE_STORE_INFO_ERROR': {
            return {
                ...state,                
                status: "error",
                error: action.error
            };
        }
        case 'UPDATE_STORE_SORT':{
            return {
                ...state,
                sort: action.value
            };        
        }
        case 'UPDATE_STORE_FILTER_PRICE':{
            return {
                ...state,
                filters: {
                        ...state.filters,
                        price: {...action.value}
                }
            };        
        }
        case 'CLEAR_ALL_STORE_FILTER_BODY_LOCATION' :{
            return {
                ...state,
                filters: {
                        ...state.filters,
                        body_location: {...initialState.filters.body_location}
                }
            };        
        }
        case 'CLEAR_STORE_FILTER_BODY_LOCATION' :{
            return {
                ...state,
                filters: {
                        ...state.filters,
                        body_location: {
                                        ...state.filters.body_location,
                                       [action.id]: {
                                                    ...state.filters.body_location[action.id],
                                                    isChecked: false}
                                    }
                }
            };        

        }        
        case 'CLEAR_STORE_FILTER_PRICE' :{
            return {
                ...state,
                filters: {
                        ...state.filters,
                        price: {...initialState.filters.price}
                }
            };      

        }
        case 'UPDATE_STORE_FILTER_BODY_LOCATION' :{
            return {
                ...state,
                filters: {
                        ...state.filters,
                        body_location: {
                                        ...state.filters.body_location,
                                       [action.id]: {
                                                    ...state.filters.body_location[action.id],
                                                    isChecked: action.value}
                                    }
                }
            };        

        }        
        default: {
            return state;
        }
    };
};
