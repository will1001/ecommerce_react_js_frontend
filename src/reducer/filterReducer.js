import{
    FILTER_PRICE,
    FILTER_RATING,
    FILTER_CONDITION,
    FILTER_PRICE_AND_RATING,
    FILTER_PRICE_AND_CONDITION,
    FILTER_RATING_AND_CONDITION,
    FILTER_ALL,
    RESET_FILTER
} from '../types/filterTypes'

const InitialState ={
    products : [],
    loading : true,
}


export const filterReducer = (state = InitialState,action)=>{
    const { type, payload } = action

    switch (type) {
        case FILTER_PRICE:
            return{
                ...state,
                products: payload,
                loading: false
            }
        case FILTER_RATING:
            return{
                ...state,
                products: payload,
                loading: false
            }
        case FILTER_CONDITION:
            return{
                ...state,
                products: payload,
                loading: false
            }
        case FILTER_PRICE_AND_RATING:
            return{
                ...state,
                products: payload,
                loading: false
            }
        case FILTER_PRICE_AND_CONDITION:
            return{
                ...state,
                products: payload,
                loading: false
            }
        case FILTER_RATING_AND_CONDITION:
            return{
                ...state,
                products: payload,
                loading: false
            }
        case FILTER_ALL:
            return{
                ...state,
                products: payload,
                loading: false
            }
            case RESET_FILTER:
                return {
                  ...state,
                  products: payload,
                  loading: false
            };
    
        default:
            return state;
    }
}