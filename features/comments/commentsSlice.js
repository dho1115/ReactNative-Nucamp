import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
        return response.json();
    }
);

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (payload, { dispatch, getState }) => {
        await setTimeout(() => {
            const { comments } = getState();

            //Add date property;
            const d = new Date();
            let datePosted = d.toISOString();
            payload.date = datePosted;

            //Add id property;
            payload.id = comments.commentsArray.length;

            console.log({ comments, payload })

            dispatch(addComment(payload));

        }, 1500);
    }
)


const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },
    reducers: {
        addComment: (state, action) => {
            state.commentsArray.push(action.payload);
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.commentsArray = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error ? action.error.message : 'Fetch failed';
        },
        [postComment.pending]: (state) => {
            console.log("state is pending...");
        },
        [postComment.rejected]: (state, action) => {
            console.log("POST REQUEST HAS REJECTED!!!");
            console.log({ error: action.error });
        }
    }
});

export const commentsReducer = commentsSlice.reducer;
export const { addComment } = commentsSlice.actions;
