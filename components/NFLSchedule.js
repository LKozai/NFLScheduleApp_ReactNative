import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedule, setWeek, addFavourite, removeFavourite, } from '../redux/slices/scheduleSlice';

const API_KEY = 'vKYj7kjpaZR15tunR0ozroZkKgEpSR8x';
// use 272 for the limit (number of game items) because there are 272 games in the NFL regular season
const API = 'https://api.apilayer.com/therundown/sports/2/schedule?limit=272&from=2024-09-01';

const NFLSchedule = () => {
  const dispatch = useDispatch();
  const selectedWeek = useSelector((state) => state.schedule.selectedWeek); // fetch selectedWeek from Redux
  const favourites = useSelector((state) => state.schedule.favourites); // fetch favourites from Redux
  const [groupedGames, setGroupedGames] = useState({}); // state to store games grouped by week

  // function to fetch NFl schedule from API
  const getSchedule = useCallback(async () => {
    const myHeaders = new Headers();
    myHeaders.append('apikey', API_KEY); // add API key to headers

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    
    // the fetch call
    const response = await fetch(API, requestOptions);

    // check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // parse response as JSON data
    dispatch(fetchSchedule(data.schedules)); // dispatch action to update store with fetched schedules
    groupGamesByWeek(data.schedules); // group fetched games by week - NFL schedule is weekly
  }, [dispatch, groupGamesByWeek]);

  // useEffect to fetch schedule when the component mounts
  useEffect(() => {
    getSchedule();
  }, [getSchedule]);

  // function to separate games by week based on their dates - rather than one long list of games
  const groupGamesByWeek = useCallback((games) => {
    const weeks = {}; // object to hold games categorized by week
    games.forEach((game) => {
      const gameDate = new Date(game.date_event); // convert game date string to Date object
      const week = getWeekNumber(gameDate); // calculate week number using the function below
      if (!weeks[week]) {
        weeks[week] = []; // initialize array for the week
      }
      weeks[week].push(game); // add game to the right week array
    });
    setGroupedGames(weeks); // update state with grouped games
  }, []);

  // function to calculate week number based on game date
  const getWeekNumber = (date) => {
    const startDate = new Date('2024-09-05'); // start of the season was Sept. 5, 2024
    /* calculate the week number by converting milliseconds all the way to weeks */
    const weekNumber = Math.floor((date - startDate) / (1000 * 60 * 60 * 24 * 7)) + 1;
    return weekNumber;
  };

  // function to handle navigating to the next week
  const handleNextWeek = () => {
    if (selectedWeek < 18) {
      // handle up to Week 18 - the final week of the NFL season
      dispatch(setWeek(selectedWeek + 1)); // dispatch action to set next week
    }
  };

  // function to handle navigating to the previous week
  const handlePreviousWeek = () => {
    if (selectedWeek > 1) {
      // Week 1 is the first week of the season
      dispatch(setWeek(selectedWeek - 1)); // dispatch action to set previous week
    }
  };

  // function to add or remove games from favourites array
  const handleFavourite = (game) => {
    if (favourites.some((fav) => fav.id === game.id)) {
      dispatch(removeFavourite(game.id)); // remove from favourites if already added
    } else {
      dispatch(addFavourite(game)); // add to favourites if not already added
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly NFL Schedule and Scores </Text>
      <View style={styles.weekNavigation}>
          <Button
            title="Previous Week"
            onPress={handlePreviousWeek} // button handles navigation to the previous week
            disabled={selectedWeek === 1} // disable button if on the first week
            color="#6569ff"
          />
          <Text style={styles.weekText}>Week {selectedWeek}</Text>
          <Button
            title="Next Week"
            onPress={handleNextWeek} // button handles navigation to the next week
            disabled={selectedWeek === 18} // disable button if on the last week
            color="#6569ff"
          />
      </View>
      <FlatList
        // create FlatList with the data from the API
        data={groupedGames[selectedWeek] || []}
        keyExtractor={(item) => item.id}
        // assign the game date from the API to each game item
        renderItem={({ item }) => {
          const gameDate = new Date(item.date_event);
          const currentDate = new Date();
          // Check if game is favourited
          const isFavourite = favourites.some((fav) => fav.id === item.id);

          return (
            <View style={styles.gameItem}>
                <Text style={styles.gameText}>
                  {`${item.away_team} @ ${item.home_team}`}
                </Text>
                <Text style={styles.dateText}>
                  Date: {gameDate.toLocaleString()}
                </Text>
                {gameDate < currentDate &&
                item.away_score !== null &&
                item.home_score !== null ? (
                  <Text style={styles.scoreText}>
                    {`Final Score: ${item.away_team} ${item.away_score}, ${item.home_team} ${item.home_score}`}
                  </Text>
                ) : (
                  <Text style={styles.upcomingText}>Upcoming Game</Text>
                )}
                <Button
                  title={isFavourite ? 'Unfavourite' : 'Favourite'}
                  onPress={() => handleFavourite(item)}
                  color={isFavourite ? '#FF0000' : '#6569ff'}
                />
            </View>
          );
        }}
      />
    </View>
  );
};

// stylesheet uses several flexbox elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000', // background colour of the container is black
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between', // arrange the two buttons on opposite sides
    marginVertical: 10,
  },
  weekText: {
    color: '#6569ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  gameText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dateText: {
    color: '#CCCCCC',
  },
  scoreText: {
    color: '#fcff0d',
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  upcomingText: {
    color: '#CCCCCC',
    paddingBottom: 3,
  },
});

export default NFLSchedule;
