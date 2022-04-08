import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography, } from "@material-ui/core";
import { Box, makeStyles, Tab, Tabs, IconButton } from "@material-ui/core";
import ProductCard from '../reusable/ProductCard';
import { getBusinessCategories } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategoryId, getProductCategoryForUser } from '../../redux/actions';
import { LOADING_GIF_URL } from '../../constants/AppConstants';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import { FB_FUNCTIONS_CORS_PROXY, GET_USER_PRODUCT_CATEGORIES_ENDPOINT } from '../../util/keywords';
import axios from 'axios';





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


  imageList: {
    width: 500,

  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },

  txtField: {},

  ctrlLabel: {
    textAlign: "left",
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

function RenderCheckboxes(props) {debugger
  const classes = useStyles();
  const { setChecked, checked, category, updateCategory,categoryId,userId } = props;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        style={{
          width: "100%",
          padding: "8px",
          background: "#292C31",
          borderRadius: "8px",
        }}
      >
        <FormControlLabel
          className={`${classes.formControlLabel} w-full flex justify-start items-center`}
          control={
            <Checkbox
              checked={checked[`${category}`]}
              onChange={(e) => {
                <ProductCard
                categoryId={categoryId}
                uid={userId}
  
              />
              }}
              name={`${category}`}
            />
          }
          label={`${category}`}
        />
      </div>
    </Grid>

  );
}

RenderCheckboxes.propTypes = {
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  updateCategory: PropTypes.func.isRequired,
  categoryId:PropTypes.string.isRequired,
  userId:PropTypes.string.isRequired
};





export default function ProductTab(props) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.product.categoryDB);
  const userId = useSelector((state) => state.auth.user.uid);

  const { updateCategory, updateRange, updateLimitCount } = props;
  const [categories, setCategories] = React.useState([]);
  const [checked, setChecked] = React.useState({});


  React.useEffect(() => {

    // (async () => {
    //   await getCats();
    // })();

  }, []);



  // const getCats = async () => { 
  //   dispatch(getProductCategoryForUser());

  //   const axiosConfig = (targetPath) => {
  //     // with proxy
  //     return {
  //         headers: {
  //             // "App-Secret": HAPPENIN_API_SECRET,
  //             // "Content-Type": "application/json",
  //             "Target-URL": targetPath,
  //             // "Auth-Token" : "not functional yet"
  //         },
  //     };
  // };

    
  //  axios
  //       .get(GET_USER_PRODUCT_CATEGORIES_ENDPOINT)
  //       .then((res) => {
  //         console.log(res);
  //         if (res.data.status === 1) {
  //           // success
  //           setCategories(res.data);
            
  //         } else if (res.data.status === 0) {
  //           // error
            
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Axios Error", err);

  //       })
      
  // };




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (


    <>
      <Card className={`${classes.roots}`}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} className="w-full flex flex-start">
            <div className="text-xs">Filters</div>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              className={`${classes.formControl} w-full`}
            >
              {/*<FormLabel component="legend">Filter by Category</FormLabel>*/}
              <FormGroup className="w-full flex">
                <Grid container spacing={2} justifyContent="flex-start">
                  {categoriesData.map((cat, index) => {
                    debugger
                    return (
                      <RenderCheckboxes
                        category={cat?.category_name}
                        categoryId= {cat?.category_id}
                        checked={checked}
                        userId={userId}
                        key={index}
                        setChecked={setChecked}
                        updateCategory={updateCategory}
                      />
                    );
                  })}
                </Grid>
              </FormGroup>
              <br />
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      
      <Box sx={{ width: '100%' }}>
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

            }
            {/* <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} /> */}

          </Tabs>
        </Box>

        {categories.map((user, i) => {

          return <TabPanel value={value} index={i}  >
            <ProductCard
              categoryId={user.category_id}
              uid={userId}

            />
          </TabPanel>
        })}



      </Box>

    </>
  );
}


