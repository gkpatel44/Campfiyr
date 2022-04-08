import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography, Card, FormControl, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Box, makeStyles, Tab, Tabs, IconButton } from "@material-ui/core";
import ProductCard from '../reusable/ProductCard';
import { getBusinessCategories } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategoryId, getProductCategoryDataForUser, getProductCategoryForUser } from '../../redux/actions';
import { LOADING_GIF_URL } from '../../constants/AppConstants';
import savedIcon from '../../image/savedIcon.svg'
import bagIcon from '../../image/bagIcon.svg'
import Testproduct from '../reusable/Testproduct';
import axios from 'axios';
import { FB_FUNCTIONS_CORS_PROXY, GET_USER_PRODUCT_BYID_ENDPOINT, GET_USER_PRODUCT_CATEGORIES_ENDPOINT, HAPPENIN_API_SECRET } from '../../util/keywords';
import ProductCardBlack from '../reusable/ProductCardBlack';
import { useHistory } from 'react-router-dom';
// import ProductCardBlack from '../reusable/ProductCardBlack';


const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // background: "white",
    background: "#494b50",
    borderRadius: "11px"
  },

  roots: {
    background: "#383D43",
    borderRadius: "8px",
    color: "#FFFFFF",
    padding: "16px",
    "@media screen and (max-width: 640px)": {
      padding: "8px",
    },
  },

  cartRoot: {
    background: "#383D43",
    borderRadius: "8px",
    color: "#FFFFFF",
    padding: "9px 16px 10px 16px",
    "@media screen and (max-width: 640px)": {
      padding: "8px",
    },
  },
  imageList: {
    width: 500,

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    border: "1px solid white"
  },
  catButton: {
    color: "#FFFFFF",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textTransform: "none"
    // opacity: 0.5
    //   background: "#292C31",
    //   borderRadius: "8px",
    //   fontSize: "12px",
    //   padding: "23px"
  },
  ctrlLabel: {
    textAlign: "center",
  },

  btn: {
    padding: "8px",
    border: "none",
    margin: "5px",
    cursor: "pointer",
    width: "100%",
    padding: "8px",
    background: "#292C31",
    borderRadius: "8px",

  },
  isActive: {
    border: '1px solid white',
    opacity: 1

  },

  formControl: {
    "& .MuiSlider-root": {
      width: "92%",

      color: "#7950F3",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      color: "#FFFFFF",
    },
    "& .MuiSelect-icon": {
      color: "#FFFFFF",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #7950F3",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "3px solid #7950F3",
    },
    "& .MuiFormControlLabel-root": {
      margin: 0,
    },
  },
  formControlLabel: {
    background: "#292C31",
    borderRadius: "8px",
    fontSize: "12px",
    "& .MuiTypography-body1": {
      fontSize: "12px",
    },
    "&:hover": {
      color: "#ABABAB",
    },
    border: "1px solid transparent",
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#586069",
    },
    "& .MuiCheckbox-root": {
      color: "#586069",
    },
  },

}));



function TabPanel(props) {
  const { children, value, index, uid, categoryId, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  categoryId: PropTypes.any,
  uid: PropTypes.any
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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






export default function ProductTab() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.product.categoryDB);
  const userId = useSelector((state) => state.auth.user.uid);
  const [categories, setCategories] = React.useState([]);
  const [productDB, setProductDB] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = React.useState(0);
    // let productDB = useSelector((state) => state.product.productDB);
  // React.useEffect(() => {
  //   fetchCategory();
  //   // fetchProductData();


  // }, []);

  React.useEffect(() => {
    fetchCategory();
  }, []);

  React.useEffect(() => {
    fetchProductData(selectedCategories);
  }, [selectedCategories]);



  const fetchProductData =  (catId) => {
    // setCategories(categoriesData)

    var getData = {
      user_id: userId,
      category_id: catId,
      page: 1,
      limit: 10,
    };
    getData = JSON.stringify(getData)

    axios
      .post(
        FB_FUNCTIONS_CORS_PROXY,
        getData,
        axiosConfig(GET_USER_PRODUCT_BYID_ENDPOINT)
      )
      .then((res) => {  
       
        console.log(res);
        if (res.data.status === 1) {

          setTimeout(() => {
            if (res) {
              setProductDB(res.data.data)
            }
          }, 2000);

          // success      
          

        } else if (res.data.status === 0) {
          // error

        }
      })
      .catch((err) => {
        console.log("Axios Error", err);

      });

  }

  const fetchCategory = () => {

    fetch(GET_USER_PRODUCT_CATEGORIES_ENDPOINT)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setCategories(data.data)

      });

  }


  const handleChangeCategory = (catId) => {
    setSelectedCategories(catId);

    // fetchProductData(catId);

    dispatch(getProductByCategoryId(userId, catId));

  }

  const handleCardBtnClick = () => {
    history.push('/cart');

  }

  const handleGetLikedProductCollection = () => {
    // get liked collection
    console.log("liked product")
  }



  return (
    <>

      {/* category display  */}
      <Card className={`${classes.roots} mt-4`}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} className="w-full flex flex-start">

            <FormControl
              component="fieldset"
              className={`${classes.formControl} w-full`}
            >
              {/*<FormLabel component="legend">Filter by Category</FormLabel>*/}
              <FormGroup className="w-full flex">
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#292C31",
                        borderRadius: "8px",
                      }}
                      className={selectedCategories === 0 ? `${classes.btn}  ${classes.isActive}` : classes.btn}

                    >
                      <Button
                        className={`${classes.formControlLabel} ${classes.catButton} w-full flex justify-center items-center normal-case  `}
                        onClick={() => handleChangeCategory(0)}
                      >
                        All
                      </Button>
                    </div>

                  </Grid>

                  {categories && Object.keys(categories).length !== 0 && categories.map((cat, index) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <div
                          // style={{
                          //   width: "100%",
                          //   padding: "8px",
                          //   background: "#292C31",
                          //   borderRadius: "8px",
                          // }}
                          className={selectedCategories === cat.category_id ? `${classes.btn}  ${classes.isActive}` : classes.btn}
                          key={cat.category_id}
                        >
                          <Button
                            className={`${classes.formControlLabel} ${classes.catButton} w-full flex justify-center items-center normal-case  `}
                            onClick={() => handleChangeCategory(cat.category_id)}
                          >
                            {cat.category_name}
                          </Button>
                        </div>

                      </Grid>

                    );
                  })}
                </Grid>
              </FormGroup>
              <br />
            </FormControl>

          </Grid>
        </Grid>
      </Card>

      {/* category cart and save button bar  */}



      <Card className={`${classes.cartRoot} mt-4`}>
        <Grid container item xs={12} className="w-full flex flex-start justify-between items-center" >
          <Grid item>
            <div>Product Listing</div>
          </Grid>

          <Grid item style={{ flexDirection: "row", display: "flex" }}>


            <Grid className='flex' >
              <Button
                style={{ color: "white", textTransform: "none" }}
                onClick={() => { handleGetLikedProductCollection() }}
              >
                <img src={savedIcon} alt="Saved Icon" />
                <h5 className='ml-2'>My Saved</h5>
              </Button>
            </Grid>

            <Grid className='flex ml-4'>
              <Button
                style={{ color: "white", textTransform: "none" }}
                onClick={() => { handleCardBtnClick() }}
              >
                <img src={bagIcon} alt="Bag Icon" />
                <h5 className='ml-2'>Cart</h5>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>


      {/* Product Display Card  */}
      
      {/* <Card className={`${classes.roots}`}> */}
      <Grid item
        xs={12}
        className="w-full flex flex-start flex-wrap justify-between"

      >

        {productDB && productDB.length > 0 ? productDB.map(user => {

          return (
            <Testproduct
              item={user}
              key={user.category_id}
            />
          )

        })
          :
          <div style={{ color: "white" }}>No Product's </div>
        }
      </Grid>
      {/* </Card> */}
      {/* <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={classes.root}>
          <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            {categoriesData.map((user, i) => {
              return <Tab label={user.category_name} {...a11yProps(i)} />
            })

            } */}
      {/* <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} /> */}

      {/* </Tabs>
        </Box>

        {categoriesData.map((user, i) => {

          return <TabPanel value={value} index={i}  >
            <ProductCard
              categoryId={user.category_id}
              uid={userId}

            />
          </TabPanel>
        })}



      </Box> */}

    </>
  );
}


