import { makeStyles } from "@material-ui/core";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 900,
    height: 450,
    // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
}));

export default function EventsSearchResults() {
  const classes = useStyles();
  const placeholderItemData = [
    {
      img: "https://picsum.photos/200/300",
      title: "Business Name",
      author: "Campfiyr",
      featured: true,
    },
    {
      img: "https://picsum.photos/600/300",
      title: "Business Name",
      author: "Campfiyr",
      active: true,
    },
    {
      img: "https://picsum.photos/800/500",
      title: "Business Name",
      author: "Campfiyr",
      featured: true,
    },
    {
      img: "https://picsum.photos/200/400",
      title: "Business Name",
      author: "Campfiyr",
      active: true,
    },
    {
      img: "https://picsum.photos/300/300",
      title: "Business Name",
      author: "Campfiyr",
      featured: true,
      active: true,
    },
    {
      img: "https://picsum.photos/100/300",
      title: "Business Name",
      author: "Campfiyr",
    },
    {
      img: "https://picsum.photos/600/300",
      title: "Business Name",
      author: "Campfiyr",
      active: true,
    },
    {
      img: "https://picsum.photos/200/200",
      title: "Business Name",
      author: "Campfiyr",
    },
    {
      img: "https://picsum.photos/200/100",
      title: "Business Name",
      author: "Campfiyr",
      featured: true,
    },
  ];
  return (
    <div className={classes.root}>
      <ImageList rowHeight={200} gap={5} className={classes.imageList} cols={3}>
        {placeholderItemData.map((item) => (
          <ImageListItem key={item.img} cols={item.featured ? 3 : 1} rows={1}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                  aria-label={`star ${item.title}`}
                  className={classes.icon}
                  style={{
                    color: `${
                      (item.featured && "yellow") || (item.active && "red")
                    }`,
                  }}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
