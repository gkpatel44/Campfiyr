import { CardActionArea, Dialog, DialogContent, makeStyles } from '@material-ui/core'
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    withStyles,
} from "@material-ui/core";
import { AccountCircle, Event, Info } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { BUSINESSNAME, EVENTDESCRIPTION, EVENTNAME } from "../../util/keywords";
import { firebaseAnalytics } from '../../firebase/firebase';
import Carousel from 'react-material-ui-carousel';
import VideoPlayerPlay from './VideoPlayerPlay';
import { distanceInKM } from "../../util/util";
import BookMarkIcon from "../../image/BookMarkIcon.svg"
import { Button } from 'react-scroll';
import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProductDisplay from './ProductDisplay';
import ProductDisplayNew from './ProductDisplayNew';
import { setLikeDislikeProduct } from '../../redux/actions';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
    root: {
        // margin: "3rem",
        background: "#383D43",
        width: "300px",
        "& .MuiCardContent-root:last-child": {
            padding: "0 10px",
        },
        borderRadius: "8px",
    },
    media: {
        // height: 500,
        width: "100%",
        height: "250px",
        // borderRadius: "8px",
        // backgroundSize: "contain",
        backgroundSize: "cover",
        backgroundColor: "#292C31",
    },
    carousel: {
        "& button:focus": {
            outline: "none",
        },
    },
    cardHeader: {
        backgroundColor: "transparent",
        position: "relative",
        top: "0rem",
        zIndex: "99",
        // marginBottom: "-5rem",
        paddingBottom: 0,
    },
    cardContent: {
        fontSize: "10px",
        color: "#FFFFFF",
        padding: "0 10px 10px 10px",
    },
    avatar: {
        backgroundColor: "#b4a2ff",
    },
    ticket: {
        color: "#b4a2ff",
    },
    titleText: {
        color: "white",
        fontWeight: "900",
    },
    white: {
        color: "white",
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
    description: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
        height: "29px"
    },
    title: {
        display: "-webkit-box",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": 1
    }
}));

const Testproduct = ({ item }) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [productDetails, setProductDetails] = useState([])
    const [openProductDetails, setOpenProductDetails] = useState(false);
    const userId = useSelector((state) => state.auth.user.uid);

    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const classes = useStyles();

    const togglePlay = () => {
        this.vidRef.play();
        setVideoPlaying(!videoPlaying);
    };

    const handleClose = () => {
        setOpenProductDetails(false);
    };

    const handleProductClick = () => {
        console.log(item);
        setProductDetails(item)
        setOpenProductDetails(true);
    }

    const handleLikedProduct = (event, product_id,itemLikeStatus) => {
        event.stopPropagation();
        let is_like;
        itemLikeStatus==1?is_like ="0":is_like='1'; 

        // calll like api with "product_id" "is_like":1,"user_id" 
 
        setLikeDislikeProduct(product_id, is_like, userId).then(res => {
            console.log("like", res);
          
        })
            .catch(err => console.log(err.response));

    }



    return (
        <>

            {item ?
                <Grid item style={{ marginTop: "16px" }} >
                    <Card className={classes.root}>

                        <CardHeader
                            avatar={
                                <Link
                                    to={item && item.busuid ? `/user/${item.business_id}` : "#"}
                                // onClick={() => {
                                //   firebaseAnalytics.logEvent("view_business", {
                                //     from: "event_card",
                                //     business_id: item.business_id,
                                //     event_id: item.eventid,
                                //   });
                                // }}
                                >
                                    <Avatar
                                        aria-label="avatar"
                                        className={classes.avatar}
                                        alt={
                                            item
                                                ? item.image
                                                // item.userData.displayName ||
                                                // item.userData[BUSINESSNAME]
                                                : "User Profile Image"
                                        }
                                        src={
                                            item
                                                ? item.image
                                                // item.userData.photoURL ||
                                                // item.userData.imageDownloadURL 
                                                : null
                                        }
                                    >
                                        <AccountCircle />
                                    </Avatar>
                                </Link>
                            }
                            action={
                                <IconButton aria-label="settings" className={classes.white}>
                                    {/* hidden for now */}
                                    {/* <StarBorder /> */}
                                </IconButton>
                            }
                            title={
                                <Link
                                    to={item && item.busuid ? `/user/${item.busuid}` : "#"}
                                // onClick={() => {
                                //     firebaseAnalytics.logEvent("view_business", {
                                //         from: "event_card",
                                //         business_id: item.busuid,
                                //         event_id: item.eventid,
                                //     });
                                // }}
                                >
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        className={classes.titleText}
                                        noWrap
                                    >
                                        {item
                                            ? item.username
                                            // item.userData.displayName ||
                                            // item.userData[BUSINESSNAME] || 
                                            : ""}
                                    </Typography>{" "}
                                </Link>
                            }
                            // subheader="September 14, 2016"
                            className={classes.cardHeader}
                        />{" "}

                        <CardActionArea onClick={(item) => handleProductClick(item)}>
                            <Carousel
                                style={{
                                    paddingBottom: "5px",
                                    "button:focus": { outline: "none" },
                                }}
                                className={`${classes.carousel} pt-3 pr-3 pl-3`}
                                autoPlay={false}
                                indicators={true}
                                // navButtonsAlwaysVisible={true}
                                animation={"slide"}
                                activeIndicatorIconButtonProps={{
                                    style: {
                                        color: "#7950F3",
                                        // backgroundColor: 'red', // 2,
                                        "& button: focus": {
                                            outline: "none",
                                        },
                                    },
                                }}
                            >



                                <CardMedia
                                    className={classes.media}
                                    // src={value || ""}
                                    image={item.product_image || ""}
                                    // key={key}
                                    title="image"
                                />



                            </Carousel>

                            <CardContent className={classes.cardContent}>
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    className="text-white"
                                >
                                    <Grid item xs={12}>

                                        <div className="w-full flex flex-col justify-center items-start">
                                            <div className="w-full flex justify-between items-start">
                                                <h4 className={`${classes.title} text-base font-bold`}>
                                                    {item ? item.product_name : "Loading ..."}
                                                </h4>

                                                <div className={classes.btnActions}>

                                                    <IconButton className={classes.button} onClick={(e) => handleLikedProduct(e, item.product_id,item.is_like)}>
                                                        <svg  id={item.product_id} width="20" height="20" viewBox="0 0 20 20" fill={item.is_like?'#7950f3':'none'} xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.0832 8.875H7.9165" stroke="#7950F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M10 6.8418V11.0085" stroke="#7950F3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M14.0166 1.6665H5.98327C4.20827 1.6665 2.7666 3.1165 2.7666 4.88317V16.6248C2.7666 18.1248 3.8416 18.7582 5.15827 18.0332L9.22494 15.7748C9.65827 15.5332 10.3583 15.5332 10.7833 15.7748L14.8499 18.0332C16.1666 18.7665 17.2416 18.1332 17.2416 16.6248V4.88317C17.2333 3.1165 15.7916 1.6665 14.0166 1.6665Z" stroke="#7950F3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>



                                                        {/* <img
                                                            src={BookMarkIcon}
                                                            style={{
                                                                color: "#7950F3",
                                                                width: "20px",
                                                                height: "20px",
                                                                fill: 'red'
                                                            }}
                                                        /> */}
                                                    </IconButton>

                                                </div>
                                            </div>
                                            <span className={`${classes.description} text-xs`} style={{ color: "#ABABAB" }}>
                                                {item ? item.description : "Loading ..."}
                                            </span>
                                        </div>
                                    </Grid>
                                </Grid>

                                <div className="flex justify-start items-start mb-2">

                                    <div
                                        className="flex whitespace-nowrap items-center text-xs"
                                        style={{ marginTop: "8px" }}
                                    >

                                        <div style={{ fontSize: "16px" }} > ${item.price}</div>

                                        {" "}

                                    </div>
                                </div>
                            </CardContent >

                        </CardActionArea>

                    </Card >
                </Grid >

                :
                null
            }

            <Dialog
                onClose={handleClose}
                open={openProductDetails}
                maxWidth='lg'
                style={{ padding: "0px important" }}
                overlayStyle={{backgroundColor: "#383d43"}}
            >
                <DialogContent style={{ padding: "1px 2px" ,background: "#383d43"}} >
                    <ProductDisplayNew
                        product={productDetails}
                        dialogStatus={setOpenProductDetails}
                        closeDialog={handleClose}
                    />
                </DialogContent>

            </Dialog>




        </>
    )
}

export default Testproduct