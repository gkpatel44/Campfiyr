import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { Component } from "react";

export class EventSkeleton extends Component {
  render() {
    return (
      <div style={{ width: "300px", height: "100%" }}>
        <Card style={{ height: "100%", background: "#31343b" }}>
          <CardMedia style={{ margin: "70px 0" }}>
            <Skeleton variant="rect" height={200} />
          </CardMedia>
          <CardContent>
            <Typography component="div" key="skele01" variant="h4" height={300}>
              <Skeleton />
            </Typography>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default EventSkeleton;
