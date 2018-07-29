import ActionCreators from './actions';
import axios from 'axios';

const { fetchDiet, fetchMeals, fetchError } = ActionCreators;

const complexFetchDiet = user => async dispatch => {
  try {
    let response = [
      { content: 'Calories', subheader: 1580, remaining: 30 },
      { content: 'Proteins', subheader: 160, remaining: 40 },
      { content: 'Carbs', subheader: 20, remaining: 15 },
      { content: 'Fats', subheader: 89, remaining: 33 }
    ];

    dispatch(fetchDiet(response));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

const complexFetchMeals = userId => async dispatch => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`api/diary/${userId}`);
    //console.log('fetchMeals',response.data);
    dispatch(fetchMeals(response.data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

export default {
  complexFetchDiet,
  complexFetchMeals
};
