import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFlickr = createAsyncThunk('flickr/request', async (opt) => {
	let url = '';
	const api_key = 'bbf48601ef45cb60f5bcfdb652b8bfa4';
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 50;

	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
	}

	if (opt.type === 'user') {
		url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
	}

	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
	}

	const result = await axios.get(url);
	return result.data.photos.photo;
});

const flickrSlice = createSlice({
	name: 'flickr',
	initialState: {
		data: [],
		isLoding: false,
	},
	extraReducers: {
		[fetchFlickr.pending]: (state) => {
			state.isLoding = true;
		},
		[fetchFlickr.fulfilled]: (state, action) => {
			state.isLoding = false;
			state.data = action.payload;
		},
		[fetchFlickr.rejected]: (state, action) => {
			state.isLoding = false;
			state.data = action.payload;
		},
	},
});

export default flickrSlice.reducer;

/*
  redux 시스템은 컴포넌트 외부에서 독립적으로 동작되야 하기 때문에
  부수효과(Side effect)를 발생시키지 않는 순수함수(Pure function) 형태로 작성되야함
*/
