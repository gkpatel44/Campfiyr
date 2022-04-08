import React from "react";

import { Grid } from "@material-ui/core";
import VerticalEventCard from "./reusable/VerticalEventCard";
import { EVENT_ID } from "../util/keywords";
import EventSkeleton from "./reusable/EventSkeleton";
import { Waypoint } from "react-waypoint";

const RenderVerticalEventCards = ({
  startIndex,
  locationEvents,
  populateEvent,
  locationBasedEvents,
  children,
}) => {
  const renderEventCards = () => {
    const filteredEvents =
      locationEvents &&
      locationEvents.length &&
      locationEvents.reduce((acc, cur, idx) => {
        if (startIndex === (idx + 3) % 3) {
          return [...acc, idx];
        }
        return acc;
      }, []);

    if (filteredEvents && filteredEvents.length) {
      // console.log('filteredEvents: ', filteredEvents);
      //console.log('locationBasedEvents: ', locationBasedEvents[0]);
      // console.log('locationEvents: ', locationEvents);
      return filteredEvents.map((index) => {
        // if (index === 0) {
        //   return null;
        // }
        return (
          <Grid key={index} item xs={12}>
            <Waypoint
              key={`event-${index}`}
              onEnter={() => {
                populateEvent(locationEvents[index], index);
              }}
            >
              {/**
               Waypoint is a slightly sensitive component.
               It is used for keeping track of whether or not a user has scrolled down to an event card or not
               On load, all event cards are skeletons (the number of displayed skeletons is determined by a seperate query to our backend DB) .
               When a user Enters a Waypoint for a card, the event data is then pulled from firebase and the skeleton disappears.
               The idea behind this was to 'conserve' user data by not preloading all the events.
               */}
              <div
                key={index}
                // className={classes.eventCards}
              >
                {locationBasedEvents[index] &&
                locationBasedEvents[index][EVENT_ID] ? (
                  // Vertical Event card is in Components/reusable .
                  // It displayes events passed down to the component through prop "item"
                  <VerticalEventCard
                    key={index}
                    item={locationBasedEvents[index]}
                  />
                ) : (
                  <EventSkeleton />
                )}
              </div>
            </Waypoint>
          </Grid>
        );
      })
    }

    return null;
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      {children && (
        <Grid item xs={12}>
          {children}
        </Grid>
      )}

      {renderEventCards(startIndex)}
    </Grid>
  );
};

export default RenderVerticalEventCards;
