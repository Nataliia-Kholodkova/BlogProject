import * as axios from 'axios';

const LIMIT = 10;

const HTTP_AXIOS = axios.create({
  baseURL: 'http://localhost:8080/api/',
  withCredentials: true,
});

const getPosts = async (page) => {
  const url = `posts?skip=${page * LIMIT}&limit=${LIMIT}`;
  const data = await HTTP_AXIOS.get(url);
  return data;
};

const getLikedPosts = async (page) => {
  const url = `posts/liked?skip=${page * LIMIT}&limit=${LIMIT}`;
  const data = await HTTP_AXIOS.get(url);
  return data;
};

const getUserPosts = async (page, userId) => {
  const url = `user/posts/${userId}?skip=${page * LIMIT}&limit=${LIMIT}`;
  const data = await HTTP_AXIOS.get(url);
  return data;
};

const getPostById = async (postId) => {
  const url = `posts/${postId}`;
  const data = await HTTP_AXIOS.get(url);
  return data;
};

const createPost = async (formData) => {
  const url = 'posts';
  const data = await HTTP_AXIOS.post(url, formData);
  return data;
};

const updatePost = async (postId, formData) => {
  const url = `posts/${postId}`;
  const data = await HTTP_AXIOS.put(url, formData);
  return data;
};

const updatePostLikes = async (postId, formData) => {
  const url = `/posts/updateLike/${postId}`;
  const data = await HTTP_AXIOS.put(url, formData);
  return data;
};

const deletePost = async (postId) => {
  const url = `posts/${postId}`;
  const data = await HTTP_AXIOS.delete(url);
  return data;
};

const createComment = async (id, formData) => {
  const url = `comments/${id}`;
  const data = await HTTP_AXIOS.post(url, formData);
  return data;
};

const updateComment = async (commentId, formData) => {
  const url = `comments/${commentId}`;
  const data = await HTTP_AXIOS.put(url, formData);
  return data;
};

const deleteComment = async (commentId) => {
  const url = `comments/${commentId}`;
  const data = await HTTP_AXIOS.delete(url);
  return data;
};

const getUser = async (userId) => {
  const url = `users/${userId}`;
  const data = await HTTP_AXIOS.get(url);
  return data;
};

const getUsers = async (page) => {
  const url = `users?skip=${page * LIMIT}&limit=${LIMIT}`;
  const usersData = await HTTP_AXIOS.get(url);
  return usersData;
};

const getFollowedUsers = async (page) => {
  const url = `users/followed?skip=${page * LIMIT}&limit=${LIMIT}`;
  const usersData = await HTTP_AXIOS.get(url);
  return usersData;
};

const getMe = async () => {
  const url = 'users/me';
  const usersData = await HTTP_AXIOS.get(url);
  return usersData;
};

const updateMePassword = async (formData) => {
  const url = 'users/me/password';
  const data = await HTTP_AXIOS.put(url, formData);
  return data;
};

const deleteMe = async () => {
  const url = 'users/me';
  const data = await HTTP_AXIOS.delete(url);
  return data;
};

const updateMe = async (formData) => {
  const url = 'users/me';
  const data = await HTTP_AXIOS.put(url, formData);
  return data;
};

const updateMePhoto = async (formData) => {
  const url = 'users/me/photo';
  const data = await HTTP_AXIOS.put(url, formData);
  return data;
};

const updateMeFriends = async (friends) => {
  const url = '/users/me/updateFriends';
  const data = await HTTP_AXIOS.put(url, friends);
  return data;
};

const signup = async (formData) => {
  const url = 'auth/signup';
  const data = await HTTP_AXIOS.post(url, formData);
  return data;
};

const signin = async (formData) => {
  const url = 'auth/signin';
  const data = await HTTP_AXIOS.post(url, formData);
  return data;
};

const signout = async () => {
  const url = 'auth/signout';
  const data = await HTTP_AXIOS.post(url);
  return data;
};

export {
  getPosts,
  getLikedPosts,
  getUserPosts,
  getPostById,
  createPost,
  updatePost,
  updatePostLikes,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  getUser,
  getUsers,
  getFollowedUsers,
  updateMePassword,
  deleteMe,
  updateMe,
  updateMePhoto,
  updateMeFriends,
  signup,
  signin,
  signout,
  getMe,
};
