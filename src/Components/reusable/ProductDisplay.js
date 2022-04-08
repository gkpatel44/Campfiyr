import { Button, ButtonBase, Grid, makeStyles, withStyles, Paper, Typography, FormControl, InputLabel, Select, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useLocation } from 'react-router-dom'
import NavBar from '../NavBar'
import { deepOrange, green, grey, orange, pink, deepPurple, red } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CancelIcon from '@material-ui/icons/Cancel';
import { reportProduct } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { FB_FUNCTIONS_CORS_PROXY, HAPPENIN_API_SECRET, REPORT_PRODUCT } from '../../util/keywords'
import axios from 'axios'




const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    background: "#292C31",
    minHeight: "100vh",
    // width: "100%",
    display: "flex",
    flexDirection: "column"
    // alignItems: "center"
  },
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    // maxWidth: 'fit-content',
    marginTop: '0px',
    backgroundColor: "#494b50",
    color: "#fff",
    overflowY: 'unset'

    // maxWidth: 500,
  },
  image: {
    // width: 128,
    // height: 128,
    maxWidth: 428
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  backArrow: {
    border: "2px solid white",
    width: "2em",
    height: "2em",
    borderRadius: "30px",
    marginRight: "30px",
    color: "white"
  },
  subNav: {
    backgroundColor: "#494b50",
    display: "flex",
    borderRadius: "24px",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "29px"
  },
  icon: {
    color: "white"
  },
  closeBtn: {
    // textAlign: "end",
    // position: " relative",
    // top: " -18px",
    // right: "-16px",    
    position: 'absolute',
    left: '95%',
    top: '-9%',
    backgroundColor: 'lightgray',
    color: 'white',

  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "-webkit-fill-available"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  select: {
    "& option": {
      background: theme.palette.background.paper

    }

    //   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //     borderColor: '#fbffffa8',
    //     color: "white"
    // },
    // '&.MuiSelect-select:not([multiple]) option':{
    //   backgroundColor:"#494b50",
    //   color: "white"
    // }


  },
  icons: {
    fill: "white",
  },


}))
const AddToCartButton = withStyles((theme) => ({
  root: {
    color: "#fff",
    backgroundColor: deepPurple['A400'],
    '&:hover': {
      color: grey[50],
      backgroundColor: deepPurple[700],
    },
  },
}))(Button);
const BuyNowButton = withStyles((theme) => ({
  root: {
    color: grey[50],
    backgroundColor: red[900],
    '&:hover': {
      color: grey[50],
      backgroundColor: red[700],
    },
  },
}))(Button);




const ProductDisplay = (props) => {

  const { product, closeDialog } = props
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  // const [product, setProduct] = useState([]);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  // const reportStatus = useSelector((state) => state.product.reportResponse.reportStatus);


  const [selectedSize, setSelectedSize] = useState();

  const handleChangeSize = (event) => {
    const name = event.target.name;
    setSelectedSize(event.target.value);
  };

  useEffect(() => {

  

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
          handleClose();

        } else if (res.data.status === 0) {
          // error
          console.log(res);
        }
      })
      .catch((err) => {
        console.log("Axios Error", err);

      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
    
      {product ?

        <Paper container className={classes.paper}>
          {/* <Grid item className={classes.closeBtn}>
            <CancelIcon onClick={closeDialog} />
          </Grid> */}
          <Grid container spacing={2} >

            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={product.product_image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid>
                      <Grid style={{ display: "flex", alignItems: " flex-end" }}>
                        <Avatar alt="Remy Sharp" src={product.image} style={{ border: "2px solid white" }} />
                        <Typography gutterBottom variant="h6" style={{ padding: " 0 0 0 5px" }}>
                          {product.username}
                        </Typography>
                      </Grid>
                      <Grid style={{ margin: "10px 1px 10px 2px" }}>
                        <Typography gutterBottom variant="h5" style={{ whiteSpace: "pre-wrap" }}>
                          {product.product_name}
                        </Typography>
                        <Typography variant="subtitle1"> ${product.price}</Typography>
                      </Grid>

                    </Grid>
                    <Grid style={{ display: "flex" }} item>


                      <SendIcon className={classes.icon} style={{ marginRight: "13px" }} />

                      <BookmarkBorderIcon className={classes.icon} />

                    </Grid>
                  </Grid>


                  {product.product_size_id ? (<Grid>
                    <Grid>
                      <Divider style={{ height: "2px" }} />
                      <Typography variant="body1" gutterBottom style={{ marginTop: "15px" }}>
                        <b> Size:</b><br />{product.product_size_id}
                      </Typography>
                    </Grid>
                    <Grid>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple" style={{ color: "white" }}>PRODUCT SIZE</InputLabel>
                        <Select
                          native
                          value={selectedSize}
                          className={classes.select}
                          onChange={handleChangeSize}
                          style={{ color: "white", background: "#494b50" }}
                          inputProps={{
                            name: 'selectedSize',
                            id: 'filled-age-native-simple',
                            classes: {
                              icon: classes.icons,
                              root: classes.selectTitle
                            },
                          }}
                        >
                          {/* <option aria-label="None" value="" /> */}
                          <option value={10}>sm</option>
                          <option value={20}>m</option>
                          <option value={30}>l</option>
                          <option value={40}>xl</option>
                          <option value={50}>xxl</option>

                        </Select>
                      </FormControl>
                    </Grid>

                  </Grid>) : null
                  }





                  <Divider style={{ height: "2px" }} />
                  <Typography variant="body1" gutterBottom style={{ marginTop: "15px" }}>
                    <b> Description:</b><br />{product.description}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary">
                      ID: 1030114
                    </Typography> */}

                </Grid>
                <Divider style={{ height: "2px" }} />
                <Grid item style={{ textAlign: "end" }}>

                  <AddToCartButton variant="contained" color="primary" className={classes.margin}>
                    ADD TO BAG
                  </AddToCartButton>


                  <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Report
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
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

                      <Button onClick={handleClose} color="primary">
                        close
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <BuyNowButton variant="contained" color="primary" onClick={closeDialog} className={classes.margin}>
                    CLOSE
                  </BuyNowButton>
                  {/* <Typography variant="body2" style={{ cursor: 'pointer' , border:'1px solid white'}}>
                      Add To Cart
                    </Typography> */}
                </Grid>
              </Grid>

            </Grid>

          </Grid>

        </Paper>
        :
        <div>Loading...</div>
      }
    </div>

    // </div>

  )
}

export default ProductDisplay


