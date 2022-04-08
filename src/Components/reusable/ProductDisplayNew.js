import { Button, ButtonBase, Dialog, DialogTitle, Grid, IconButton, makeStyles, Paper, Typography, DialogActions } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import BookMarkIcon from "../../image/BookMarkIcon.svg"
import image from "../../image/Rectangleimage.png"
import visitIcon from '../../image/visitIcon.svg'
import messageIcon from '../../image/reportIcon.svg'
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { AddProductToCart, getProductsAllSize } from '../../redux/actions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grey, green } from "@material-ui/core/colors";
import { FB_FUNCTIONS_CORS_PROXY, HAPPENIN_API_SECRET, REPORT_PRODUCT } from '../../util/keywords';
import axios from 'axios';
import AlertToaster from './AlertToaster';


const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        // maxWidth: 'fit-content',
        marginTop: '0px',
        backgroundColor: "#494b50",
        color: "#fff",
        overflowY: 'unset',
        // padding: "2em",
        // background: "#292C31",
        // minHeight: "100vh",
        // width: "100%",
        display: "flex",
        justifyContent: "center",

        // maxWidth: 500,
    },
    cardroot: {
        background: "#383D43",
        // borderRadius: "8px",
        color: "#FFFFFF",
        padding: "16px",

        "@media screen and (max-width: 640px)": {
            padding: "8px",
        },
        display: 'flex',

        // justifyContent: 'center'
    },

    contentbar: {
        display: 'flex',

    },

    headerbar: {
        display: "flex",
        marginBottom: "10px",
        // background: "#292C31",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        height: "fit-content"
        // borderRadius: "8px"
    },
    profileTag: {
        display: 'flex',
        alignItems: 'center',
        background: "#292C31",
        marginTop: '10px',
        borderRadius: '5px',
        justifyContent: "space-between",
        width: "40%",
        padding: "10px 16px"
    },


    imageBox: {
        borderRadius: '10px',
        background: "#292C31",
        marginRight: "18px",
        justifyContent: "space-between",
        padding: "20px"
    },
    image: {
        width: "100%",
        height: " 100%"
    },
    img: {
        margin: 'auto',
        display: 'block',
        // maxWidth: '100%',
        // maxHeight: '100%',
        borderRadius: '8px',
        maxHeight: "550px",
        // width: "100%",
        objectFit: "cover",
        width: "-webkit-fill-available"

    },
    customizedButton: {
        position: 'absolute',
        left: '91%',
        top: '-5%',
        backgroundColor: 'white',
        color: 'red',
        borderRadius: '15px'
    },
    btn: {
        background: "#383D43",
        marginRight: '5px',
        marginLeft: '5px',
        color: 'white'
    },
    btnActions: {
        display: "flex",
        "& .MuiIconButton-root": {
            padding: "5px",
        },
    },
    button: {
        "&:focus": {
            outline: "none",
        },
    },
    titleWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px"
        // margin:" 20px 16px"

    },
    titleText: {
        color: "white",
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "16px",
        paddingLeft: '7px'
    },
    loader: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },


}));



const ProductDisplayNew = (props) => {
    const { closeDialog, dialogStatus, product } = props
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user.uid);
    const [productSizeList, setProductSizeList] = useState();
    const [productSizeListErrorMessage, setProductSizeListErrorMessage] = useState();
    const [isAddToBagLoading, setIsAddToBagLoading] = useState(false);
    const [addToBagResponseMessage, setAddToBagResponseMessage] = useState();
    const greenColor = green[500];
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [isResponseAndDisplaySuccess, setIsResponseAndDisplaySuccess] = useState(false);




    useEffect(() => {
        fetchSizeData();
    }, [])


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
    }

    const fetchSizeData = () => {
        getProductsAllSize().then(res => {
            console.log("size", res);
            setProductSizeList(res)

        })
            .catch(err => setProductSizeListErrorMessage(err));

    }

    const handleCloseDialog = () => {
        closeDialog();
    }



    const handleBookMark = (event) => {
        event.stopPropagation();
        console.log("bookmarked product");
    }

    const handleAddToBag = (productId, quantity = "1") => {
        setIsAddToBagLoading(true);
        AddProductToCart(productId, userId, quantity)
            .then(res => {
                console.log(res);
                if (res.status == 1) {
                    setIsAddToBagLoading(false);
                    setAddToBagResponseMessage(res.msg);
                    setIsResponseAndDisplaySuccess(true)

                    // closeDialog();

                } else {
                    setIsAddToBagLoading(false);
                    setAddToBagResponseMessage(res.msg)
                    setIsResponseAndDisplaySuccess(true);
                }
            })
            .catch(err => {
                setIsAddToBagLoading(false);
                console.log(err)
            })
        }


const handleReportProduct = (item) => {

    var getData = {
        user_id: item.user_id,
        product_id: item.product_id,
        report_type: "Testing"
    };

    getData = JSON.stringify(getData)

    // console.log(getData);

    axios
        .post(
            FB_FUNCTIONS_CORS_PROXY,
            getData,
            axiosConfig(REPORT_PRODUCT)
        )
        .then((res) => {
            console.log(res);
            if (res.data.status === 1) {
                // success
                console.log(res);
                handleCloseReportDialog();

            } else if (res.data.status === 0) {
                // error
                console.log(res);
            }
        })

};

const handleClickOpen = () => {
    setOpenReportDialog(true);
};

const handleCloseReportDialog = () => {
    setOpenReportDialog(false);
};



const classes = useStyles();
return (
    <Paper container >
        {isAddToBagLoading &&
            <div className={classes.loader}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    display: 'flex',

                    position: 'absolute',
                    top: '100px',
                    right: '590px',

                }}
            >
                <CircularProgress />

            </div>
        }


        {isResponseAndDisplaySuccess &&
            <AlertToaster

                isOpen={isResponseAndDisplaySuccess}
                data={addToBagResponseMessage}
                dialogStatus={setIsResponseAndDisplaySuccess}
            />
        }

        <Grid container className={classes.cardroot} >


            {/* <IconButton style={{ borderRadius: '8px', borderRadius: "8px", position: "relative", top: "-194px", left: "166px" }}
                    onClick={() => { handleCloseDialog(true) }}
                >
                    <HighlightOffIcon className={classes.customizedButton} />
                </IconButton> */}
            <Grid item xs={12} className={classes.headerbar}>
                <Grid className={classes.profileTag}>
                    <Grid item>
                        <Grid style={{
                            // marginLeft: '13px',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "max-content"
                        }}>
                            <Avatar alt="Remy Sharp" src={image} />
                            <Typography
                                variant="body1"
                                component="span"
                                className={classes.titleText}
                                noWrap
                            >
                                {product.username}
                                {/* {item */
                                            // ? item.username
                                            // item.userData.displayName ||
                                            // item.userData[BUSINESSNAME] || 
                                            /* : ""} */}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <div
                            style={{ marginLeft: '13px' }}>

                            <IconButton className={classes.button} style={{ padding: "0px" }} onClick={handleBookMark}>
                                <img
                                    src={visitIcon}
                                    style={{
                                        color: "#7950F3",
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </IconButton>
                            visit
                        </div>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12} sm={2}
                    style={{ textAlign: "end" }}
                >
                    <IconButton className={classes.button} style={{ padding: "0px" }} onClick={handleClickOpen}>
                        <img
                            src={messageIcon}
                            style={{
                                color: "#7950F3",
                                width: "20px",
                                height: "20px",
                            }}
                        />
                    </IconButton>
                    Report
                </Grid>


                <Dialog
                    open={openReportDialog}
                    onClose={handleCloseReportDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure To Report This Product?"}</DialogTitle>
                    {/* <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                       Are you sure To Report This Product?
                      </DialogContentText>
                    </DialogContent> */}
                    <DialogActions>
                        <Button onClick={() => handleReportProduct(product)} color="primary" autoFocus>
                            Report
                        </Button>

                        <Button onClick={handleCloseReportDialog} color="primary">
                            close
                        </Button>
                    </DialogActions>
                </Dialog>









            </Grid>
            <Grid item xs={12} className={classes.contentbar}>
                <Grid item xs={12} sm={8} className={classes.imageBox}>
                    <Grid className={classes.titleWrapper}>


                        <Grid
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: "#292C31",

                                // marginLeft: '13px'
                            }}>

                            {product.product_name}
                        </Grid>

                        <Grid>
                            <div className={classes.btnActions}>

                                <IconButton className={classes.button} onClick={handleBookMark}>
                                    <img
                                        src={BookMarkIcon}
                                        style={{
                                            color: "#7950F3",
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            // margin: "0px 13px"
                        }}
                    >
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={product.product_image} />
                        </ButtonBase>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: "#292C31",
                            marginBottom: '10px',
                            // height: '60px',
                            borderRadius: '10px',
                            padding: '30px 20px'

                        }}>
                        <div
                            style={{
                                // marginLeft: '13px'
                                fontWeight: "700",
                                fontSize: "24px"
                            }}>
                            ${product.price}
                        </div>
                    </Grid>
                    <Grid
                        style={{
                            background: "#292C31",
                            marginBottom: '10px',
                            justifyContent: "space-between",
                            // height: '132px',
                            borderRadius: '10px',
                            padding: "16px"
                        }}>
                        <Grid
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: "#292C31",
                                marginBottom: '10px',
                                // borderRadius: '10px',
                                borderRadius: "8px",
                                fontFamily: 'Roboto',
                                fontStyle: "normal",
                                fontWeight: "700",
                                fontSize: "16px",

                                color: '#7950F3'

                            }}>
                            <div

                            >
                                Description
                            </div>
                        </Grid>
                        <Grid
                            style={{
                                background: "#383D43",
                                borderRadius: '10px',
                                fontFamily: 'Roboto',
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "12px",
                                lineHeight: "14px",
                                padding: "16px",
                                color: "#FFFFFF"

                            }}
                        >
                            {product.description}
                        </Grid>
                    </Grid>

                    {productSizeList &&
                        <Grid
                            style={{
                                background: "#292C31",
                                marginBottom: '10px',
                                height: '90px',
                                borderRadius: '10px'
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
                                        marginTop: '10px',
                                        marginLeft: '13px'
                                    }}>
                                    Size
                                </div>
                            </Grid>

                            <Grid
                                style={{
                                    marginTop: '10px',
                                    marginLeft: '18px'
                                }}>

                                {productSizeList && productSizeList.map(item => {
                                    return (
                                        <Button className={classes.btn} >
                                            {item.size_name}
                                        </Button>
                                    )
                                })
                                }
                                {/* <Button className={classes.btn} >
                                     Xs
                                 </Button>
                                 <Button className={classes.btn} >
                                     L
                                 </Button>
                                 <Button className={classes.btn} >
                                     M
                                 </Button> */}
                            </Grid>
                        </Grid>

                    }

                    <Grid
                        style={{
                            background: "#292C31",
                            marginBottom: '10px'
                        }}>
                        <Button
                            style={{
                                background: "#7950f3",
                                color: 'white',
                                width: '100%',
                                textTransform: 'none'
                            }}
                            onClick={() => handleAddToBag(product.product_id)}
                        >
                            Add to Bag
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>

    </Paper >
)
}

export default ProductDisplayNew