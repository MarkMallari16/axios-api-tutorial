import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

//getting the data

export const fetchPosts = async () => {
    try {
        const { data } = await axios.get(`${API_URL}?_limit=8`);

        return data;
    } catch (err) {
        console.log(err);
    }
}
//updating the data

export const updatePosts = async (id, updatedPosts) => {
    try {
        const { data } = await axios.put(`${API_URL}/${id}`, updatedPosts);

        return data;
    } catch (err) {
        console.log(err);
    }
}

//deleting the data

export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);

        return id;
    } catch (err) {
        console.log(err);
    }
}

//creating a post

export const createPost = async (newPost) => {
    try {
        const { data } = await axios.post(API_URL, newPost);

        return data;
    } catch (err) {
        console.log(err);
    }
}