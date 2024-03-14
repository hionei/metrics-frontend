import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";

export default function RewardCard({ value, title, amount }) {
  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={value}>
          {value}%
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">{title}</Typography>
          <Typography level="h2">{amount}</Typography>
        </CardContent>
      </CardContent>
      {/* <CardActions>
        <Button variant="soft" size="sm">
          Add to Watchlist
        </Button>
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions> */}
    </Card>
  );
}
