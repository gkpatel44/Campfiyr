import axios from "axios";

import {
    ADD_PRODUCT_To_CART,
    APPLY_PROMOCODE_TO_CART,
    DELETE_CART_ITEM_BY_ID,
    FB_FUNCTIONS_CORS_PROXY,
    GET_CART_ADDRESS_FOR_CHECKOUT,
    GET_CART_LIST_DATA,
    GET_PAYMENT_CARD_DETAILS_FOR_CHECKOUT,
    GET_USER_PRODUCT_ALL_SIZE_ID,
    GET_USER_PRODUCT_BYID_ENDPOINT,
    GET_USER_PRODUCT_CATEGORIES_ENDPOINT,
    HANDLE_PRODUCT_CHECKOUT,
    HANDLE_PRODUCT_LIKE_DISLIKE,
    HAPPENIN_API_SECRET,
    UPDATE_CART_QUANTITY_BY_CART_ID,
    // REPORT_PRODUCT
} from "../../util/keywords";
import {
    PRODUCT_CATEGORY_PULL_FAILURE_DB,
    PRODUCT_CATEGORY_PULL_REQUEST_DB,
    PRODUCT_CATEGORY_PULL_SUCCESS_DB,
    PRODUCT_PULL_REQUEST_DB,
    PRODUCT_PULL_FAILURE_DB,
    PRODUCT_PULL_SUCCESS_DB,
    // REPORT_PRODUCT_FAILURE,
    // REPORT_PRODUCT_SUCCESS,
    // REPORT_PRODUCT_REQUEST
} from "../types";

/***get product category************************/

const requestAllProductCategory = () => {
    return {
        type: PRODUCT_CATEGORY_PULL_REQUEST_DB
    };
};

const receiveAllProductCategory = (data) => {
    return {
        type: PRODUCT_CATEGORY_PULL_SUCCESS_DB,
        payload: data,
    };
};

const errorReceivingAllProductCategory = (data) => {
    return {
        type: PRODUCT_CATEGORY_PULL_FAILURE_DB,
        payload: data,
    };
};

/*********get productBy Category Id********************/

const requestProductByCategoryId = () => {
    return {
        type: PRODUCT_PULL_REQUEST_DB,
    };
};
const receivingProductByCategoryId = (data) => {
    return {
        type: PRODUCT_PULL_SUCCESS_DB,
        payload: data,
    };
};
const errorReceivingProductByCategoryId = (data) => {
    return {
        type: PRODUCT_PULL_FAILURE_DB,
        payload: data,
    };
};

/*********Add To Cart product ******************************/

// const requestAddtoCart =()=>{
//     return{
//         type:,
//         payload:data
//     }
// }
// const receivingAddtoCart =()=>{
//     return{
//         type:,
//         payload:data
//     }
// }
// const errorAddtoCart =()=>{
//     return{
//         type:,
//         payload:data
//     }
// }

/*********Report product ******************************/

// const requestReportProduct =()=>{
//     return {
//         type: REPORT_PRODUCT_REQUEST,
//     };
    
// }

// const receivingReportProduct =(data)=>{
//     return {
//         type: REPORT_PRODUCT_SUCCESS,
//         payload: data,
//     };
// }

// const errorReportProduct =(data)=>{
//     return {
//         type: REPORT_PRODUCT_FAILURE,
//         payload: data,
//     };
    
// }


const axiosConfig = (targetPath) => {
    // with proxy
    return {
        headers: {
            "App-Secret": HAPPENIN_API_SECRET,
            "Content-Type": "application/json",
            "Target-URL": targetPath,
            // "Auth-Token" : "not functional yet"
        },
    };
};
// SEE HERE for why the proxy is needed:  https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe



/***get product category************************/

export const getProductCategoryForUser = () => (dispatch) => {
    dispatch(requestAllProductCategory());
    return new Promise((resolve, reject) => {
    axios
        .get(GET_USER_PRODUCT_CATEGORIES_ENDPOINT)
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                dispatch(receiveAllProductCategory(res.data.data));

                return resolve(res.data.data);
            } else if (res.data.status === 0) {
                // error
                dispatch(errorReceivingAllProductCategory(res.data.msg));
                return resolve(res.data.data);
               
            }
        })
        .catch((err) => {
            return reject(err);
            console.log("Axios Error", err);
            
        });
    })
}

/***get product category************************/

export const getProductCategoryDataForUser = () => {
    
    return new Promise((resolve, reject) => {
    axios
        .get(GET_USER_PRODUCT_CATEGORIES_ENDPOINT)
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
               resolve(res.data.data);
            } else if (res.data.status === 0) {
                // error
               resolve(res.data.msg);
            }
        })
        .catch((err) => {
           reject("Axios Error", err);
            
        });
    })
}


/*********get productBy Category Id********************/

export const getProductByCategoryId = (uid, CategoryId) => (dispatch) => {
   
    var getData = {
        user_id: uid,
        category_id: CategoryId,
        page: 1,
        limit: 10,
    };
    getData =JSON.stringify(getData)
    dispatch(requestProductByCategoryId());
    axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(GET_USER_PRODUCT_BYID_ENDPOINT)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                dispatch(receivingProductByCategoryId(res.data.data));
            } else if (res.data.status === 0) {
                // error
                dispatch(errorReceivingProductByCategoryId(res.data.msg));
            }
        })
        .catch((err) => {
            console.log("Axios Error", err);
            
        });
}

// Add Product To Cart

export const AddProductToCart =  (productId,userId,quantity)=>{
    var getData = {
        user_id: userId,
        product_id: productId,
        qty:quantity
    };
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(ADD_PRODUCT_To_CART)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })
}

// get Cart Data

export const getCartListData = (userId)=>{
    var getData = {
        user_id: userId        
    }
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(GET_CART_LIST_DATA)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })
}

// delete items from cart
export const deleteCartItemById = (productId,userId)=>{
    var getData = {
        user_id: userId,
        product_id:productId        
    }
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(DELETE_CART_ITEM_BY_ID)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })
}

//update cart quantity

export const onUpdateCartQty=(cartId,qty)=>{

    var getData = {         
        cart_id:cartId,
        qty:qty
    }     
    
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(UPDATE_CART_QUANTITY_BY_CART_ID)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })

}

// apply Promocode

export const applyPromocode=(promocode)=>{

    var getData = {         
        product_promo_name:promocode
    }     
    
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(APPLY_PROMOCODE_TO_CART)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })

}

// get Cart List Data Address For Checkout

export const getCartListDataAddressForCheckout=(UserToken)=>{

    var getData = {         
        user_token:UserToken
    }     
    
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(GET_CART_ADDRESS_FOR_CHECKOUT)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })

}

// get card details for checkout.

export const getPaymentDetails=(businessId)=>{

    var getData = {         
        business_id:businessId
    }     
    
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(GET_PAYMENT_CARD_DETAILS_FOR_CHECKOUT)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })

}


// handle checkout 

export const handleUserCheckout=(userId,cardId,addressId,coupon)=>{

    var getData = {         
       
        user_id:userId,
        card_id:cardId,
        address_id:addressId,
        is_coupon_apply:coupon
    }     
    
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(HANDLE_PRODUCT_CHECKOUT)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })

}

// setlikedislike product
export const setLikeDislikeProduct=(productId,isLike,userId)=>{

    var getData = { 
       
        user_id:userId,
        product_id:productId,        
        is_like:isLike
    }     
    
    getData =JSON.stringify(getData)
    return new Promise((resolve, reject) => {
   
     axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(HANDLE_PRODUCT_LIKE_DISLIKE)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                resolve(res.data)
             
            } else if (res.data.status === 0) {
                // error
                resolve(res.data)
              
            }
        })
        .catch((err) => {
            reject(err)
            
        });
    })

}


// get all product size
export const getProductsAllSize = ()=>{


    return new Promise((resolve, reject) => {
    axios
        .post(GET_USER_PRODUCT_ALL_SIZE_ID,{ "Access-Control-Allow-Origin": "*" })
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
             

                return resolve(res.data);
            } else if (res.data.status === 0) {
                // error
          
                return resolve(res.data);
               
            }
        })
        .catch((err) => {
            return reject(err);
            console.log("Axios Error", err);
            
        });
    })

}



/*********Report product ******************************/ 

// export const  reportProduct=(productId,userIid)=>(dispatch)=>{

//     var getData = {        
//             user_id:userIid,
//             product_id:productId,
//             report_type:"Testing"        
//     };

//     getData =JSON.stringify(getData)

//     // console.log(getData);
//     dispatch(requestReportProduct());
//     axios
//         .post(
//             FB_FUNCTIONS_CORS_PROXY,
//             getData,
//             axiosConfig(REPORT_PRODUCT)
//         )
//         .then((res) => {
//             console.log(res);
//             if (res.data.status === 1) {
//                 // success
//                 console.log(res);
//                 dispatch(receivingReportProduct(res.data));
//             } else if (res.data.status === 0) {
//                 console.log(res);
//                 // error
//                 dispatch(errorReportProduct(res.data));
//             }
//         })
//         .catch((err) => {
//             console.log("Axios Error", err);
        
//         });

// }