import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../app/shared/baseURL";
// import { COMMENTS } from "../../app/shared/COMMENTS";


const initialState = { commentsArray: [], isLoading: true, errMsg: "" };

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async() => {
        const response = await fetch(baseURL + 'comments')
        if (!response.ok) {
            return Promise.reject('rejected fetch request. Status is ' + response.status + ".")
        }
        const data = response.json();
        return data;
    }
)

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (comment, {dispatch}) => {
        const response = await fetch(baseURL + 'comments', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        dispatch(addComment(data))
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            const newComment = { id: state.commentsArray.length + 1, ...action.payload }
    
            state.commentsArray.push(newComment); //We can do this mutation b/c of Immer.
        }
    },
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.commentsArray = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch has failed.';
        },
        [postComment.rejected]: (state, action) => {
            alert('Your comment could not posted.' + (action.error ? action.error.message : 'Post has failed'));
        }
    }
})
export const { addComment } = commentsSlice.actions; //Action creator.
console.log({ addComment });

export const commentsReducer = commentsSlice.reducer;

export const selectCommentsByCampsiteId = (campsiteId) => {
    return state => state.comments.commentsArray.filter(comment => comment.campsiteId === parseInt(campsiteId))
}
