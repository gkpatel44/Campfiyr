import {
    PRODUCT_CATEGORY_PULL_REQUEST_DB,
    PRODUCT_CATEGORY_PULL_SUCCESS_DB,
    PRODUCT_CATEGORY_PULL_FAILURE_DB,
    PRODUCT_PULL_REQUEST_DB,
    PRODUCT_PULL_FAILURE_DB,
    PRODUCT_PULL_SUCCESS_DB,
    // REPORT_PRODUCT_REQUEST,
    // REPORT_PRODUCT_SUCCESS,
    // REPORT_PRODUCT_FAILURE

} from '../types'

export default (
    state = {
        isRetrievingProductCategoryDB: false,
        errorRetrievingProductCategoryDB: false,
        categoryDB: {},
        isRetrievingProductByIdDB: false,
        errorRetrievingProductByIdDB: false,
        productDB: {},
        // reportResponse: {
        //     isRetriveingReport: false,
        //     errorRetrievingReport: false,
        //     reportStatus: {}
        // }
    },
    action
) => {
    switch (action.type) {

        case PRODUCT_CATEGORY_PULL_REQUEST_DB:
            return {
                ...state,
                isRetrievingProductCategoryDB: true,
                errorRetrievingProductCategoryDB: false,
                categoryDB: {}

            };
        case PRODUCT_CATEGORY_PULL_SUCCESS_DB:
            return {
                ...state,
                isRetrievingProductCategoryDB: false,
                errorRetrievingProductCategoryDB: false,
                categoryDB: action.payload
            }
        case PRODUCT_CATEGORY_PULL_FAILURE_DB:
            return {
                ...state,
                isRetrievingProductCategoryDB: false,
                errorRetrievingProductCategoryDB: true,
                categoryDB: {}
            }
        case PRODUCT_PULL_REQUEST_DB:
            return {
                ...state,
                isRetrievingProductByIdDB: true,
                errorRetrievingProductByIdDB: false,
                productDB: {}
            }
        case PRODUCT_PULL_SUCCESS_DB:
            return {
                ...state,
                isRetrievingProductByIdDB: false,
                errorRetrievingProductByIdDB: false,
                productDB: action.payload
            }
        case PRODUCT_PULL_FAILURE_DB:
            return {
                ...state,
                isRetrievingProductByIdDB: false,
                errorRetrievingProductByIdDB: true,
                productDB: {}
            }

        // case REPORT_PRODUCT_REQUEST :
        // return{

        //     ...state,
        //     reportResponse: {
        //         isRetriveingReport: true,
        //         errorRetrievingReport: false,
        //         reportStatus: {}
        //     }

        // }
        // case REPORT_PRODUCT_SUCCESS :
        // return{
        //     ...state,
        //     reportResponse: {
        //         isRetriveingReport: false,
        //         errorRetrievingReport: false,
        //         reportStatus: action.payload
        //     }

        // }
        // case REPORT_PRODUCT_FAILURE:
        // return{

        //     ...state,
        //     reportResponse: {
        //         isRetriveingReport: false,
        //         errorRetrievingReport: true,
        //         reportStatus: action.payload
        //     }

        // }
        
        


        default:
            return state;

    }
};