// import {
//   Avatar,
//   // CircularProgress,
//   fade,
//   InputAdornment,
//   TextField,
//   Typography,
//   withStyles,
// } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";
// import React, { Component } from "react";
// import {
//   searchBySearchArray,
//   // theWorstPossibleWayToSearch,
// } from "../redux/actions/user";
// import { connect } from "react-redux";
// import { Person } from "@material-ui/icons";
// import { Redirect, withRouter } from "react-router-dom";
// import SearchIcon from "@material-ui/icons/Search";
// import {
//   ListboxComponent,
//   renderGroup,
// } from "../pages/Search/components/SearchBarList/SearchBarList";
// import { isEmptyString } from "../util/util";
// import Popper from "@material-ui/core/Popper";
// import Fade from "@material-ui/core/Fade";
// import Paper from "@material-ui/core/Paper";

// const styles = (theme) => ({
//   root: {},
//   avatar: {
//     width: "2rem",
//     height: "2rem",
//     backgroundColor: "#b4a2ff",
//   },
//   names: {
//     paddingLeft: "1em",
//     fontWeight: "700",
//   },
//   inputRoot: {
//     width: 300,
//     fontFamily: "Roboto Mono",
//     backgroundColor: fade("#fff", 0.15),
//     borderRadius: 25,
//     borderWidth: "0px",
//     color: "white",

//     "&:hover": { backgroundColor: fade("#fff", 0.25), color: "#b4a2ff" },
//     "&.Mui-focused ": {
//       color: "white",
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderWidth: "0px",
//       // borderColor: "blue",
//       color: "white",
//       borderRadius: 25,
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderWidth: "0px",
//       // borderColor: "blue",
//       color: "white",
//       borderRadius: 25,
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderWidth: "1px",
//       borderColor: "#fff",
//       borderRadius: 25,
//     },
//   },
//   inputInput: {
//     color: "white",
//     fontSize: "10px",
//   },
//   searchIcon: {
//     color: "white",
//   },
//   option: {
//     color: "#ABABAB",
//     "&:hover": {
//       color: "#FFFFFF",
//       background: "#292C31",
//     },
//   },
//   paper: {
//     background: "#383D43",
//   },
// });

// class Search extends Component {
//   state = {
//     loading: false,
//     options: [],
//     open: false,
//     selected: {},
//     query: "",
//   };

//   render() {
//     const { selected, query } = this.state;
//     // const { allUsersAndBusinesses } = this.props;
//     const { classes, dispatch, recentSearches } = this.props;
//     const { searching, searchResults, lastCall } = this.props;
//     const { history } = this.props;
//     const clearSelection = () => {
//       this.setState({ selected: {} });
//     };
//     if (selected && selected.id) {
//       const id = selected.id;
//       clearSelection();
//       return <Redirect to={`/user/${id}`} />;
//     }
//     // if (allUsersAndBusinesses) {
//     //   this.setState({ loading: false });
//     // }
//     const SearchView = (props) => {
//       const { option } = props;
//       return (
//         <React.Fragment>
//           {option?.id && (
//             <>
//               <Avatar
//                 alt={
//                   (option?.data &&
//                     (option.data.displayname ||
//                       option.data["business name"])) ||
//                   ""
//                 }
//                 src={option?.data?.photoURL || option?.data?.imageDownloadURL}
//                 className={classes.avatar}
//               >
//                 <Person />
//               </Avatar>

//               <Typography variant="button" className={classes.names}>
//                 {(option?.data &&
//                   (option.data.displayname || option.data["business name"])) ||
//                   ""}
//               </Typography>
//             </>
//           )}
//         </React.Fragment>
//       );
//     };

//     const optionsRenderer = () => {
//       return searchResults && Array.isArray(searchResults)
//         ? searchResults.length > 0
//           ? searchResults
//           : [" "]
//         : [];
//     };
//     return (
//       <div className={classes.search}>
//         <Autocomplete
//           freeSolo
//           size="small"
//           id="user-search"
//           // open={query.length > 2}
//           classes={{
//             root: classes.inputRoot,
//             input: classes.inputInput,
//             option: classes.option,
//             paper: classes.paper,
//           }}
//           loading={searching}
//           // onFocus={() => {
//           //   dispatch(searchBySearchArray(null, query));
//           // }}
//           onChange={(event, value) => {
//             if (value) {
//               this.setState({ selected: value });
//             }
//           }}
//           options={optionsRenderer()}
//           getOptionLabel={(option) =>
//             (option.data &&
//               (option.data.displayname || option.data["business name"])) ||
//             ""
//           }
//           noOptionsText={"Nothing to show"}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               variant="outlined"
//               style={{ fontSize: "12px" }}
//               placeholder="Search for businesses, users and products"
//               onChange={(e) => {
//                 this.setState({ query: e.target.value });
//                 dispatch(
//                   searchBySearchArray(null, e.target.value.toLowerCase())
//                 );
//               }}
//               InputProps={{
//                 ...params.InputProps,
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon className={classes.searchIcon} />
//                   </InputAdornment>
//                 ),
//               }}
//               onKeyUp={(event) => {
//                 if (event.key === "Enter" && !isEmptyString(query)) {
//                   history.push(`/search/all?q=${query}`);

//                   console.log("enter pressed");
//                 }
//               }}
//             />
//           )}
//           renderOption={(option) =>
//             Array.isArray(searchResults) && <SearchView option={option} />
//           }
//           ListboxComponent={ListboxComponent}
//           ListboxProps={{
//             textQuery: query,
//             recentOptions: recentSearches,
//           }}
//           renderGroup={renderGroup}
//           disableListWrap
//         />
//         {/* <Popper open={openPopper} anchorEl={popperAnchorEl} placement={""} transition>
//         {({ TransitionProps }) => (
//           <Fade {...TransitionProps} timeout={350}>
//             <Paper>
//               <Typography className={classes.typography}>The content of the Popper.</Typography>
//             </Paper>
//           </Fade>
//         )}
//       </Popper> */}
//       </div>
//     );
//   }
// }
// function mapStateToProps(state) {
//   return {
//     allUsersAndBusinesses: state.user.allUsersAndBusinesses,
//     allUsersAndBusinessesLastPull: state.user.allUsersAndBusinessesLastPull,
//     lastCall: state.appInterface.lastCall,
//     searching: state.appInterface.searching,
//     searchResults: state.appInterface.searchResults,
//     recentSearches: state.search.recentSearches,
//   };
// }
// export default withStyles(styles)(connect(mapStateToProps)(withRouter(Search)));
