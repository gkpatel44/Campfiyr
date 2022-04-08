import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategoryId } from '../../redux/actions';
import { useHistory } from "react-router";
import ProductDisplay from './ProductDisplay';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ProductCardBlack from './ProductCardBlack';
// import itemData from './itemData';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "transparent"
  },
  imageList: {
    width: 'auto',


  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  card: {
    borderRadius: '5px'
  },
  subHeader: {
    color: 'white',
    textAlign: 'center',
    fontSize: '20px'
  },
  closeBtn:{
    textAlign:"end"
  }

}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 */


export default function ProductCard(props) {
  const { categoryId, uid } = props
  const classes = useStyles();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState([])
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const productData = useSelector((state) => state.product.productDB);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));





  useEffect(() => {
    dispatch(getProductByCategoryId(uid, categoryId));//dont forget to replace 0 with  categoryId.
  }, [])


  // const handleProductClick = (item) => {

  //   history.push({
  //     pathname: "/productDetails",
  //     state: {
  //       product: item
  //     }
  //   });
  // }

  const handleProductClick = (item) => {
    setProductDetails(item);
    setOpen(true);
  }



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };




  return (

    <>

    <ProductCardBlack/>
      {productData.length > 0 ? <div className={classes.root} >
        <ImageList rowHeight={180} className={classes.imageList}>
          {/* <ImageListItem key="Subheader" cols={2} style={{ height: 'auto',color:'white' }}>
          <ListSubheader component="div" className={classes.subHeader}>Campfiyr</ListSubheader>
        </ImageListItem> */}

          {productData.map((item) => (
            <ImageListItem
              key={item.product_id}
              style={{ width: '33%', height: "auto", padding: '6px' }}
              className={classes.card}
            >

              <img src={item.product_image} alt={item.product_name} onClick={() => handleProductClick(item)} />
              <ImageListItemBar
                title={item.product_name}
                subtitle={<span> ${item.price}</span>}
                onClick={() => handleProductClick(item)}
                actionIcon={
                  <IconButton aria-label={`info about ${item.product_name}`} className={classes.icon} onClick={(e) => { e.stopPropagation(); console.log("btnclicked") }}>
                    <BookmarkBorderIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
        : <div>
          "LOADING..."
        </div>
      }




      <Dialog
        onClose={handleClose}
        open={open}
        fullScreen={fullScreen}
        maxWidth='md'
        style={{ padding: "0px important" }} >
        {/* <DialogTitle  onClose={handleClose}>
        <CloseIcon/>
      </DialogTitle> */}
        <DialogContent style={{ padding: "1px 2px"}} >
         
         
          <ProductDisplay
            product={productDetails}
            dialogStatus={setOpen}
            closeDialog={handleClose}
          />
        </DialogContent>
        {/* <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Save changes
        </Button>
      </DialogActions> */}
      </Dialog>
    </>
  );
}