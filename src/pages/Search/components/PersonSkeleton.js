import { Card, CardHeader } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export default function PersonSkeleton() {
  return (
    <div>
      <Card style={{ background: "#292C31", padding: "8px" }} elevation={0}>
        <CardHeader
          avatar={<Skeleton variant="circle" width={40} height={40} />}
          title={<Skeleton variant="rect" height={10} />}
          subheader={<Skeleton variant="rect" height={30} />}
        />
      </Card>
    </div>
  );
}
