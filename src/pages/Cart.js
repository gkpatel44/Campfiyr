import {
    Paper,
    TableRow,
    TableHead,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Grid,
    Card,
    CardHeader,
    Avatar,
    IconButton,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Collapse,
    CssBaseline,
    withStyles,
    ButtonBase,
    ButtonGroup,
    Button,
    TextField
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import img from '../image/Rectangleimage.png';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core'
// import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import NavBar from '../Components/NavBar';
import { getCartListData, deleteCartItemById, onUpdateCartQty, applyPromocode } from "../redux/actions/product"
import { useHistory } from 'react-router-dom';


const CssTextField = withStyles({
    root: {
        width: "100%",
        //   '& label.Mui-focused': {
        //     color: 'white',

        //   },
        //   '& .MuiInput-underline:after': {
        //     borderBottomColor: 'green',

        //   },
        '& .MuiOutlinedInput-root':
        {
            color: "white",
            '& fieldset': {
                borderColor: 'transparent',

            },
            // '&:hover fieldset': {
            //   borderColor: 'white',

            // },
            '&.Mui-focused fieldset': {
                borderColor: 'white',

            },
            '& .MuiOutlinedInput-input': {
                background: '#383D43',
                borderRadius: '8px',
                padding: "12.5px 14px"
            }
        },
    },
})(TextField);
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2em",
        background: "#292C31",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto"
        // alignItems: "center"
    },

    cardroot: {
        background: "#383D43",
        borderRadius: "8px",
        color: "#FFFFFF",
        padding: "16px",
        // height: 550,
        height: "fit-content",
        "@media screen and (max-width: 640px)": {
            padding: "8px",
        },
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center'
    },
    headerbar: {
        height: "60px",
        marginBottom: "10px",
        display: 'flex',
        justifyContent: 'space-between'
    },
    imageBox: {
        borderRadius: '10px',
        background: "#292C31",
        padding: "20px",
        height: "fit-content"

    },
    image: {
        background: "#383D43",
        marginTop: '22px',
        width: '200px',
        height: '178px',
        marginLeft: '10px',
        margin: 'auto',
        display: 'block',
        marginBottom: '10px',
    },
    btn: {
        background: "#ABABAB",
        marginRight: '25px',
        marginLeft: '5px',
        color: 'white',
        height: '44px',
        borderRadius: '8px',
        textTransform: 'none',
        marginLeft: "16px"
    },
    customizedButton: {
        position: 'absolute',
        top: '29%',
        left: '85%',
        backgroundColor: 'white',
        color: 'red',
        borderRadius: '15px'
    },
    customizebackbtn: {
        background: 'white',
        color: 'black',
        borderRadius: '5px',
        paddingLeft: '7px',
    },
    productTitle: {
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: '500'
    },
    catwithPrice: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '35px',
        marginBottom: '38px',
    },
    userAvtar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avtarImg: {
        width: '30px',
        height: '30px',
        border: '5px solid black',
    },
    promoCode: {
        // marginLeft: '13px'
    },
    promoCodewrapper: {
        display: 'flex'
    }
}))

const Cart = () => {
    const classes = useStyles();
    const history = useHistory();
    const userId = useSelector((state) => state.auth.user.uid);
    const [cartList, setCartList] = useState([]);
    const [promoCode, setPromoCode] = useState();
    const [promoCodeMessage, setPromoCodeMessage] = useState();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {

        getCartListData(userId)
            .then(res => {
                console.log(res);
                setCartList(res.data)

            })
            .catch(err => console.log(err.response));


    }

    const handleDeleteProduct = (productID) => {
        deleteCartItemById(productID, userId)
            .then(res => {
                console.log(res);
                fetchData();
            })
            .catch(err => console.log(err.response));
    }

    const handleUpdateCartQty = (cartId, quantity) => {
        onUpdateCartQty(cartId, quantity).then(res => {

            fetchData();

        })
            .catch(err => console.log(err.response));

    }

    const handleChangePromocode = (e) => {
        setPromoCode(e.target.value);
    }

    const handleApplyPromocode = () => {
        if (promoCode !== '') {
            applyPromocode(promoCode).then(res => {

                console.log(res);
                setPromoCodeMessage(res)
                fetchData();
            })
                .catch(err => setPromoCodeMessage(err));
        };
    }

    const handleApplyPromocodeCancel = () => {
        setPromoCodeMessage();
        setPromoCode();
    }


    const handleProceed = () => {
        var status;
        promoCodeMessage ? status = 1 : status = 0


        history.push({ pathname: '/checkout', is_like: status });


    }




    return (
        <div>

            <Helmet>
                <title>Dashboard | Campfiyr</title>
            </Helmet>

            <NavBar />
            <div className={classes.root}>
                {cartList && (
                    <Grid xs={8} className={classes.cardroot}>
                        <Grid container >
                            <Grid container className={classes.headerbar}>
                                <Grid item xs={12} sm={12}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: '10px',
                                    }}>
                                    <div style={{ cursor: 'pointer', display: "flex", alignItems: "center" }}>
                                        <ButtonBase
                                            onClick={history.goBack}
                                        >
                                            <ArrowBackIosIcon className={classes.customizebackbtn} />
                                            <h4 style={{ fontSize: "16px", lineHeight: "24px", paddingLeft: "10px", margin: "0", fontWeight: "700" }}>Shoping Bag</h4>
                                        </ButtonBase>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container xs={12} sm={12}    >
                                <Grid item xs={12} sm={7}

                                    className={classes.imageBox}>
                                    {cartList.cartlist ? cartList.cartlist.map((item) => {
                                        return (
                                            <Grid container xs={12} style={{marginBottom: "10px"}}>
                                                <Grid xs={12} sm={4}>
                                                    <div  >



                                                        <img alt="complex" src={item.product_image} height="178" width="200" style={{ height: "178px", width: "200px", borderRadius: '8px' }} />

                                                        <IconButton style={{ borderRadius: '8px', borderRadius: "8px", position: "relative", top: "-194px", left: "166px" }}
                                                            onClick={() => { handleDeleteProduct(item.product_id) }}
                                                        >
                                                            <HighlightOffIcon className={classes.customizedButton} />
                                                        </IconButton>
                                                    </div>


                                                </Grid>
                                                <Grid xs={12} sm={8}>
                                                    <Grid style={{ marginLeft: '15px' }}>
                                                        <Grid>
                                                            <Grid className={classes.productTitle}>
                                                                {item.product_name}
                                                            </Grid>
                                                            {item.selected_size_id > 0 &&
                                                                <Grid>
                                                                    Size:{item.selected_size_id == 1 ? 'XS' :
                                                                        item.selected_size_id == 2 ? 's' :
                                                                            item.selected_size_id == 3 ? "M" :
                                                                                item.selected_size_id == 4 ? "L" :
                                                                                    item.selected_size_id == 5 ? "XL" : "not valid size"}

                                                                </Grid>
                                                            }

                                                        </Grid>
                                                        <Grid className={classes.catwithPrice}>
                                                            <Grid className={classes.userAvtar}>
                                                                <Avatar alt="Remy Sharp" src={item.image} className={classes.avtarImg} />
                                                                <span style={{ paddingLeft: '10px', fontSize: '12px', lineHeight: '18px', fontWeight: '500' }}>
                                                                    {item.username}
                                                                </span>
                                                            </Grid>
                                                            <Grid className={classes.productPrice}>
                                                                <span style={{ fontSize: '24px', lineHeight: '24px', fontWeight: '700' }}>${item.price}</span>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid className={classes.productQty} style={{ height: '44px', width: '139px', backgroundColor: '#383D43', borderRadius: '8px' }}>
                                                            <ButtonGroup size="small" aria-label="small outlined button group">
                                                                <Button
                                                                    style={{ border: 'none', minWidth: '47px', padding: '8px 9px' }}
                                                                    onClick={() => { handleUpdateCartQty(item.cart_id, item.qty - 1) }}
                                                                >
                                                                    <span
                                                                        style={{ color: '#292C31', backgroundColor: '#7950F3', height: '20px', width: '20px', borderRadius: '6px' }}
                                                                    >
                                                                        -
                                                                    </span>
                                                                </Button>

                                                                <Button
                                                                    disabled
                                                                    style={{ border: 'none', fontSize: '16px', color: 'white', minWidth: '47px', padding: '8px 9px' }}
                                                                >
                                                                    {item.qty}
                                                                </Button>

                                                                <Button
                                                                    onClick={() => handleUpdateCartQty(item.cart_id, item.qty + 1)}
                                                                    style={{ border: 'none', minWidth: '47px', padding: '8px 9px' }}
                                                                >
                                                                    <span style={{ color: '#292C31', backgroundColor: '#7950F3', height: '20px', width: '20px', borderRadius: '6px' }}
                                                                    >+
                                                                    </span>
                                                                </Button>

                                                            </ButtonGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>)
                                    })
                                        :
                                        <Grid container>
                                            <h5 style={{ color: "red" }}>No Items In Cart</h5>
                                        </Grid>

                                    }

                                </Grid>
                                <Grid item xs={12} sm={5}
                                    style={{
                                        padding: "0px 0px 0px 16px"
                                    }}>
                                    <Grid style={{
                                        background: "#292C31",
                                        marginBottom: '10px',
                                        justifyContent: "space-between",
                                        // height: '114px',
                                        borderRadius: '10px',
                                        padding: '16px'

                                        // minWidth: '335px'
                                    }}>
                                        <Grid
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: "#292C31",
                                                height: '51px',
                                                borderRadius: '10px',
                                            }}>
                                            <div
                                                style={{
                                                    // marginLeft: '13px',
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    color: '#7950F3',
                                                    fontWeight: '700'
                                                }}>
                                                Promo code
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>
                                            <Grid className={classes.promoCodewrapper} xs={12}>
                                                <Grid className={classes.promoCode} xs={9}>
                                                    <CssTextField
                                                        className={classes.margin}
                                                        // label="Enter Promo code"
                                                        placeholder="Enter Promo code"
                                                        variant="outlined"
                                                        id="custom-css-outlined-input"
                                                        onChange={handleChangePromocode}
                                                    />

                                                    <div style={{ marginBottom: "5px" }}>
                                                        {promoCodeMessage && Object.keys(promoCodeMessage).length !== 0 ?
                                                            <h4>
                                                                YAY! You saved ${promoCodeMessage.data.shipping_fee}
                                                            </h4>

                                                            : ''
                                                        }
                                                    </div>
                                                </Grid>
                                                <Grid xs={4}>
                                                    {promoCodeMessage ?
                                                        < Button
                                                            className={classes.btn}
                                                            style={{ backgroundColor: "#F35050" }}
                                                            onClick={handleApplyPromocodeCancel}
                                                        >
                                                            Cancel
                                                        </Button>

                                                        :
                                                        <Button
                                                            className={classes.btn}

                                                            onClick={handleApplyPromocode}
                                                        >
                                                            Apply
                                                        </Button>
                                                    }
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        style={{
                                            background: "#292C31",
                                            marginBottom: '10px',
                                            // justifyContent: "space-between",
                                            // height: '194px',
                                            borderRadius: '10px',
                                            // minWidth: '335px',
                                            padding: "16px"

                                        }}>
                                        <Grid
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: "#292C31",
                                                marginBottom: '10px',
                                                borderRadius: '10px'
                                            }}>
                                            <div
                                                style={{
                                                    // marginLeft: '13px',
                                                    fontSize: '16px',
                                                    lineHeight: '24px',
                                                    color: '#7950F3',
                                                    fontWeight: '700',
                                                    marginTop: '11px',
                                                }}>
                                                Summary
                                            </div>
                                        </Grid>
                                        <Grid
                                            style={{
                                                background: "#383D43",
                                                // width: '287px',
                                                // marginTop: '18px',
                                                // marginLeft: '14px',
                                                borderRadius: '10px',
                                                padding: "4%"

                                            }}
                                        >
                                            <Grid
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: "space-between",
                                                    marginLeft: '5px',
                                                    marginRight: '5px',
                                                    marginTop: '5px'
                                                }}
                                            >
                                                <Grid style={{ fontWeight: 400, fontSize: "12px" }}>
                                                    Order amount
                                                </Grid>
                                                <Grid>
                                                    ${cartList.sub_total}
                                                </Grid>
                                            </Grid>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: "space-between",
                                                    marginLeft: '5px',
                                                    marginRight: '5px',
                                                    marginTop: '5px'
                                                }}>
                                                <div style={{ fontWeight: 400, fontSize: "12px" }}>
                                                    Shipping fee
                                                </div>
                                                <div>
                                                    ${cartList.shipping_fee}
                                                </div>
                                            </div>
                                            {promoCodeMessage && Object.keys(promoCodeMessage).length !== 0 ?
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: "space-between",
                                                        marginLeft: '5px',
                                                        marginRight: '5px',
                                                        marginTop: '5px'
                                                    }}>
                                                    <div style={{ fontWeight: 400, fontSize: "12px" }}>
                                                        Coupon discount
                                                    </div>
                                                    <div>
                                                        (-) ${promoCodeMessage.data.shipping_fee}
                                                    </div>
                                                </div>
                                                : null

                                            }



                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: "space-between",
                                                    marginLeft: '5px',
                                                    marginRight: '5px',
                                                    marginTop: '5px'
                                                }}>
                                                <div style={{ fontWeight: 400, fontSize: "12px" }}>
                                                    Total
                                                </div>
                                                <div>
                                                    {promoCodeMessage ? cartList.sub_total + cartList.shipping_fee - promoCodeMessage.data.shipping_fee :
                                                        cartList.sub_total + cartList.shipping_fee}
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        style={{
                                            background: "#292C31",
                                            marginBottom: '10px'
                                        }}>
                                        <Button
                                            style={{
                                                background: "#7950f3",
                                                color: 'white',
                                                width: '100%'
                                            }}

                                            onClick={handleProceed}
                                        >
                                            Proceed
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                )

                }

            </div>
        </div >
    )
}

export default Cart