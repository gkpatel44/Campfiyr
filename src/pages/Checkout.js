import React, { useEffect, useState } from 'react';

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
    TextField,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Helmet } from 'react-helmet'
import NavBar from '../Components/NavBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import grey from '@material-ui/core/colors/grey';

import item from '../image/Rectangleimage.png';

// import back from './img/Vector.png';
import visa from '../image/visa.png';

//import Avatar from '@material-ui/core/Avatar';


import { makeStyles } from '@material-ui/core';
import { getCartListData, getCartListDataAddressForCheckout, getPaymentDetails, handleUserCheckout } from '../redux/actions';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import AlertDialog from '../Components/reusable/AlertDialog';
import { PermPhoneMsg } from '@material-ui/icons';



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
        // justifyContent: 'center',
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
        height: 'fit-content',
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
        textTransform: 'capitalize',
    },
    customizedButton: {
        position: 'absolute',
        left: '91%',
        top: '-5%',
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
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '700',
        marginTop: '15px'
    },
    catwithPrice: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '25px',
        marginBottom: '25px',
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
        marginLeft: '13px'
    },
    promoCodewrapper: {
        display: 'flex'
    },
    radioGroupGrid: {
        padding: "16px",
        /* border: 1px solid white", */
        borderRadius: "8px",
        background: " #383d43",
    },
    mainTitle: {
        fontSize: "16px", lineHeight: "24px", paddingLeft: "10px", margin: "0"
    },
    topBackbtn: {
        cursor: 'pointer', display: "flex", alignItems: "center"
    },
    topHeader: {
        display: 'flex', alignItems: 'center', marginTop: '10px',
    },
    singleProduct: {
        // maxHeight: '280px',
        background: '#383D43',
        maxWidth: '48%',
        // margin: '8px',
        // margin: '20px 15px',
        borderRadius: '8px',
        margin: "0px 20px 20px 0px",

        '& img': {
            borderRadius: "8px",
            // width: "100%",
            width: "250px",
            borderRadius: "8px",
            height: "250px"


        },
        "@media screen and (max-width: 900px)": {
            maxWidth: "100%",
            marginBottom: "20px"
        }
    },
    productQty: {
        fontSize: '12px',
        fontWeight: '18px',
        fontWeight: '500',
    },
    productContain: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0'
    },
    sizeQty: {
        fontSize: '12px',
        fontWeight: '500',
    },
    mainProductwrapper: {
        justifyContent: "flex-start",
        "@media screen and (max-width: 900px)": {
            flexDirection: "column",
        }
    },
    summaryMain: {
        background: "#292C31",
        marginBottom: '10px',
        justifyContent: "space-between",
        // height: '220px',
        borderRadius: '10px',
        minWidth: '335px',
        padding: "16px"
    },
    summaryInner: {
        display: 'flex',
        alignItems: 'center',
        background: "#292C31",
        marginBottom: '10px',
        borderRadius: '10px'
    },
    summaryTitle: {
        // marginLeft: '13px',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#7950F3',
        fontWeight: '700',
        // marginTop: '11px',
    },
    summarysmallbox: {
        background: "#383D43",
        // width: '305px',
        // marginTop: '18px',
        // marginLeft: '14px',
        borderRadius: '10px',
        padding: '16px'
    },
    checkoutInfo: {
        display: 'flex', justifyContent: "space-between", marginLeft: '5px', marginRight: '5px', marginTop: '5px'
    },
    infoLeft: {
        fontSize: '12px',
        fontWeight: 400,
    },
    infoRight: {
        fontSize: '16px',
        fontWeight: 700,
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    paymentOption: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center"
    },
    inputRadio: {

        '& span': {
            width: '100%',
            display: 'flex',
            padding: '5px',
            background: '#292C31',
            justifyContent: 'center'

        },
    },
    progressRoot: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    alertRoot: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },



}));


const useStylesForRadio = makeStyles({
    root: {
        width: "100%",
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(121, 80, 243,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#7950f3',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#7950f3',
        },
    },
});
function StyledRadio(props) {
    const classes = useStylesForRadio();


    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}


const Checkout = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const greyColor = grey[50];
    const userId = useSelector((state) => state.auth.user.uid);
    const [cartList, setCartList] = useState();
    const [addressList, setSAddressList] = useState();
    const [paymentDetails, setPaymentDetails] = useState();
    const [cardId, setCardId] = useState();
    const [addressId, setAddressId] = useState();
    const [checkOutStatus, setCheckoutStatus] = useState();
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
    const [alertMissingField, setAlertMissingField] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [displayAlert, setDisplayAlert] = useState(false);
    const couponApply = location.is_like;

    const [addressRadio, setAddressRadio] = useState('female');

    const handleChangeAdressRadio = (event) => {
        setAddressRadio(event.target.value);
        console.log(event.target.value)
    };





    useEffect(() => {
        fetchCardDetails();
        fetchAddressDetails();
        fetchGetPaymentDetails();
    }, [])

    const fetchCardDetails = () => {
        getCartListData(userId)
            .then(res => {
                console.log(res);
                setCartList(res.data);

            })
            .catch(err => console.log(err.response));

    }

    const fetchAddressDetails = () => {
        getCartListDataAddressForCheckout(userId)
            .then(res => {
                console.log(res);
                setSAddressList(res.data)
            })
            .catch(err => console.log(err.response));

    }

    const fetchGetPaymentDetails = () => {
        getPaymentDetails(userId)
            .then(res => {
                console.log(res.data.all_sources);
                setPaymentDetails(res.data.all_sources)

            })
            .catch(err => console.log(err.response));

    }


    const handlecheckout = () => {
        setIsLoadingCheckout(true)

        const coupon = location.is_like;
        if (userId && cardId && addressId) {
            handleUserCheckout(userId, cardId, addressId, coupon)
                .then(res => {
                    debugger
                    console.log(res);
                    if (res.status == 0) {
                        setDisplayAlert(true)
                    }

                    setCheckoutStatus(res);
                    setIsLoadingCheckout(false);


                })
                .catch(err => console.log(err.response));

        }
        else {
            console.log("missing field");
            // setDisplayAlert(true)
            setAlertMissingField(true);


        }




    }

    const handleChangePaymentInformatio = (event) => {
        console.log("payment", event.target.value);
        setCardId(event.target.value);
    };

    const handleChangeAddressInformation = (event) => {
        console.log("Address", event.target.value);
        setAddressId(event.target.value);
    };

    return (
        <div>


            <Helmet>
                <title>Dashboard | Campfiyr</title>
            </Helmet>

            <NavBar />

            {displayAlert &&
                <AlertDialog
                    isOpen={displayAlert}
                    data={checkOutStatus}
                    dialogStatus={setDisplayAlert}
                />
            }
            {alertMissingField &&

                < AlertDialog
                    isOpen={alertMissingField}
                    data={{ msg: 'missing field' }}
                    dialogStatus={setAlertMissingField}
                />}



            {cartList && cartList.cartlist ?
                <div className={classes.root}>
                    <Grid xs={8} className={classes.cardroot}>
                        <Grid container>
                            <Grid container className={classes.headerbar}>
                                <Grid item xs={12} sm={12} className={classes.topHeader} >
                                    <div className={classes.topBackbtn} onClick={history.goBack}>
                                        <ArrowBackIosIcon className={classes.customizebackbtn} />
                                        <h4 className={classes.mainTitle}>Order Confirmation</h4>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid item xs={12} sm={7} className={classes.imageBox}>
                                    <Grid style={{ marginBottom: '15px' }}>
                                        <span className={classes.productQty}>
                                            {cartList.cartlist ? Object.keys(cartList.cartlist).length : 'No'} Items</span>
                                    </Grid>
                                    <Grid container className={classes.mainProductwrapper}>

                                        {cartList && cartList.cartlist && cartList.cartlist.map((item) => {
                                            return (
                                                <Grid className={classes.singleProduct} key={item.product_id}>
                                                    <Grid style={{ padding: '10px' }}>
                                                        <img alt="complex" src={item.product_image} />
                                                        <Grid className={classes.productTitle}>
                                                            {item.product_name}
                                                        </Grid>
                                                        <Grid className={classes.productContain}>

                                                            {item.size_name &&
                                                                <Grid className={classes.sizeQty}>
                                                                    Size :{item.size_name}
                                                                </Grid>
                                                                }
                                                            <Grid className={classes.sizeQty}>
                                                                Quantity : {item.qty}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>)
                                        })}

                                        {/* <Grid className={classes.singleProduct}>
                                        <Grid style={{ padding: '10px' }}>
                                            <img alt="complex" src={item} />
                                            <Grid className={classes.productTitle}>
                                                Men Navy Polo Collar T-shirt
                                            </Grid>
                                            <Grid className={classes.productContain}>
                                                <Grid className={classes.sizeQty}>
                                                    Size : L
                                                </Grid>
                                                <Grid className={classes.sizeQty}>
                                                    Quantity : 2
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid> */}

                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={5}
                                    style={{
                                        padding: "0px 0px 0px 16px"
                                    }}>


                                    <Grid className={classes.summaryMain}>
                                        <Grid className={classes.summaryInner}>
                                            <div className={classes.summaryTitle}>
                                                Summary
                                            </div>
                                        </Grid>
                                        <Grid className={classes.summarysmallbox}>
                                            <Grid className={classes.checkoutInfo}>
                                                <span className={classes.infoLeft}> Order amount </span>
                                                <span className={classes.infoRight}> ${cartList.sub_total} </span>
                                            </Grid>
                                            <Grid className={classes.checkoutInfo}>
                                                <span className={classes.infoLeft}> Shipping fee </span>
                                                <span className={classes.infoRight}> ${cartList.shipping_fee} </span>
                                            </Grid>
                                            {couponApply == 1 ?
                                                <Grid className={classes.checkoutInfo}>
                                                    <span className={classes.infoLeft}> Coupon discount </span>
                                                    <span className={classes.infoRight}> (-)$4.50 </span>
                                                </Grid>
                                                : null
                                            }

                                            <Grid className={classes.checkoutInfo}>
                                                <span className={classes.infoLeft}> Tax </span>
                                                <span className={classes.infoRight}>  ${cartList.tax} </span>
                                            </Grid>
                                            <Grid className={classes.checkoutInfo}>
                                                <span className={classes.infoLeft}> Total </span>
                                                <span className={classes.infoRight}>$
                                                    {couponApply == 1 ? parseFloat((cartList.sub_total + cartList.shipping_fee + cartList.tax - 4.50).toFixed(2)) :
                                                        parseFloat((cartList.sub_total + cartList.shipping_fee + cartList.tax).toFixed(2))}




                                                </span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid className={classes.summaryMain}>
                                        <Grid className={classes.summaryInner}>
                                            <div className={classes.summaryTitle}>
                                                Payment Information
                                            </div>
                                        </Grid>
                                        <Grid style={{ gap: 15 }} container>
                                            <FormControl style={{ width: "100%" }} control={<StyledRadio />} component="fieldset">
                                                <RadioGroup
                                                    aria-label="Payment Information"
                                                    name="customized-radios"
                                                    value={cardId}
                                                    onChange={handleChangePaymentInformatio}
                                                >
                                                    {paymentDetails && paymentDetails.data.map(items => {
                                                        return (

                                                            <Grid item className={classes.radioGroupGrid} style={{ marginBottom: "16px" }}>
                                                                <Grid className={classes.paymentOption}>
                                                                    <Grid className={classes.cardIcon}>
                                                                        <img src={visa} />
                                                                    </Grid>
                                                                    <Grid className={classes.cardNumber}>
                                                                        XXXX XXXX XXXX {items.last4}
                                                                    </Grid>
                                                                    <Grid className={classes.cardDate}>
                                                                        {items.exp_month} / {items.exp_year.toString().substr(-2)}
                                                                    </Grid>
                                                                    <Grid className={classes.cardSelection}>

                                                                        <FormControlLabel control={<StyledRadio />} value={items.id} />

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            /* <Grid item className={classes.radioGroupGrid} style={{ marginBottom: "16px" }}>
                                                                <Grid className={classes.paymentOption}>
                                                                    <Grid className={classes.cardIcon}>
                                                                        <img src={visa} />
                                                                    </Grid>
                                                                    <Grid className={classes.cardNumber}>
                                                                        XXXX XXXX XXXX {item.last4}
                                                                    </Grid>
                                                                    <Grid className={classes.cardDate}>
                                                                        {item.exp_month} / {item.exp_year.toString().substr(-2)}
                                                                    </Grid>
                                                                    <Grid className={classes.cardSelection}>

                                                                        <FormControlLabel control={<StyledRadio />} value="2" />

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid> */
                                                        )
                                                    })}

                                                    {/* <Grid item className={classes.radioGroupGrid}  >
                                                        <Grid className={classes.paymentOption}>
                                                            <Grid className={classes.cardIcon}>
                                                                <img src={visa} />
                                                            </Grid>
                                                            <Grid className={classes.cardNumber}>
                                                                1234 5678 9101 2222
                                                            </Grid>
                                                            <Grid className={classes.cardDate}>
                                                                01/23
                                                            </Grid>
                                                            <Grid className={classes.cardSelection}>

                                                                <FormControlLabel control={<StyledRadio />} value="male" />

                                                            </Grid>
                                                        </Grid>
                                                    </Grid> */}

                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid className={classes.summaryMain}>
                                        <Grid className={classes.summaryInner}>
                                            <div className={classes.summaryTitle}>
                                                Address Information
                                            </div>
                                        </Grid>
                                        <Grid style={{ gap: 15 }} container>
                                            <FormControl control={<StyledRadio />} style={{ width: "100%" }} component="fieldset">
                                                <RadioGroup

                                                    aria-label="Address Information"
                                                    name="customized-radios"
                                                    value={addressId}
                                                    onChange={handleChangeAddressInformation}
                                                >

                                                    {addressList && addressList.map(item => {
                                                        return (
                                                            <Grid item className={classes.radioGroupGrid} style={{ marginBottom: "16px" }}>
                                                                <Grid className={classes.paymentOption}>
                                                                    <Grid>
                                                                        <Grid className={classes.cardIcon}>
                                                                            <h3>{item.address}</h3>
                                                                        </Grid>

                                                                        <Grid className={classes.cardNumber} style={{ marginTop: "10px" }}>
                                                                            {item.address1}
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid className={classes.cardSelection}>
                                                                        <FormControlLabel control={<StyledRadio />} value={(item.address_id).toString()} />

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                        )
                                                    })


                                                    }

                                                    {/* <Grid item className={classes.radioGroupGrid}  >
                                                        <Grid className={classes.paymentOption}>
                                                            <Grid>
                                                                <Grid className={classes.cardIcon}>
                                                                    <h3>helllo</h3>
                                                                </Grid>

                                                                <Grid className={classes.cardNumber} style={{ marginTop: "10px" }}>
                                                                    404, City Corner near downtown, emily road behind old market, Canada.
                                                                </Grid>
                                                            </Grid>

                                                            <Grid className={classes.cardSelection}>

                                                                <FormControlLabel control={<StyledRadio />} value="male" />

                                                            </Grid>
                                                        </Grid>
                                                    </Grid> */}

                                                </RadioGroup>
                                            </FormControl>
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
                                            onClick={() => handlecheckout()}
                                        >
                                            Checkout
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                    {/* <Grid >
                        {alertMissingField &&
                            <div className={classes.alertRoot}>
                                <Alert variant="filled" severity="error">
                                    This is an error alert — check it out!
                                </Alert>
                            </div>
                        }
                        {isLoadingCheckout &&
                            <div style={{ background: "#292C31" }}>

                                <CircularProgress />
                            </div >
                        }
                    </Grid> */}
                </div>
                : <Grid className={classes.root} >
                    <div style={{ background: "#292C31" }}>
                        <CircularProgress color={greyColor} />
                    </div >
                </Grid>
            }



        </div >

    );
}

export default Checkout