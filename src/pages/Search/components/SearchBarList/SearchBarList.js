import React from "react";
import PropTypes from "prop-types";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useTheme } from "@material-ui/core/styles";
import { VariableSizeList } from "react-window";

import Divider from "@material-ui/core/Divider";

import RecentSearch from "./components/RecentSearch";
import FullSearchOption from "./components/FullSearchOption";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
export const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  // as far as i understand, this component handles padding/ spacing on its own

  const { children, textQuery, recentOptions, ...other } = props;
  const { withResults = true } = props; // default to true if not present
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48; // this number is the size of the eight between the groupBy title and the elements below
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <div style={{ width: "100%" }}>
          <FullSearchOption textQuery={textQuery} />
          <RecentSearch
            inputQuery={textQuery}
            recentOptions={recentOptions || []}
          />
          <Divider />
        </div>

        {withResults && (
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        )}
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
  textQuery: PropTypes.string.isRequired,
  recentOptions: PropTypes.array.isRequired,
};

export const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];

// export default function Virtualize() {
//   const classes = useStyles();
//   const [textQuery, setTextQuery] = useState("");
//   return (
//     <Autocomplete
//       id="virtualize-demo"
//       style={{ width: 300 }}
//       disableListWrap
//       classes={classes}
//       ListboxComponent={ListboxComponent}
//       ListboxProps={{ textQuery: textQuery }}
//       renderGroup={renderGroup}
//       options={OPTIONS}
//       groupBy={(option) => option[0].toUpperCase()}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           variant="outlined"
//           label="10,000 options"
//           onChange={(e) => {
//             setTextQuery(e.target.value);
//           }}
//         />
//       )}
//       renderOption={(option) => <Typography noWrap>{option}</Typography>}
//     />
//   );
// }
