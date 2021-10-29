import { updatePostLikes, updateMeFriends } from './processData';

export const fetchData = async (
  func,
  page,
  setLoad,
  setData,
  setError,
  setCanLoad,
) => {
  setLoad(true);
  try {
    const { data } = await func(page);
    const { posts, users } = data;
    if (!posts && !users) {
      throw new Error(data.message);
    }
    if (posts) {
      if (posts.length === 0) {
        setCanLoad(false);
      } else {
        setData((oldPosts) => [...oldPosts, ...posts]);
        setCanLoad(true);
      }
    }
    if (users) {
      if (users.length === 0) {
        setCanLoad(false);
      } else {
        setData((oldUsers) => [...oldUsers, ...users]);
        setCanLoad(true);
      }
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoad(false);
  }
};

export const fetchUpdateLike = async (
  post, isLiked, likedPosts, currentUser,
  setCurrentUser, setError, setPost = null, setPosts = null,
) => {
  const like = isLiked ? -1 : 1;
  let newLikedPosts = [...likedPosts];
  try {
    await updatePostLikes(post._id, { like });
    if (!isLiked) {
      newLikedPosts.push(post._id);
    } else {
      newLikedPosts = newLikedPosts.filter((id) => id !== post._id);
    }
    if (setPost) {
      await setPost({ ...post, likes: post.likes + like });
    }
    if (setPosts) {
      setPosts((oldPosts) => oldPosts.map(
        (p) => (p._id === post._id ? { ...post, likes: post.likes + like } : p),
      ));
    }
    await setCurrentUser({ ...currentUser, likedPosts: newLikedPosts });
  } catch {
    setError('Something went wrong...');
  }
};

export const fetchCommentAction = async (
  id, data, post, setPost, handlerFunc, flagSetterFunc, setError,
) => {
  const newPost = { ...post };
  try {
    const response = await handlerFunc(id, data);
    if (response.status !== 200) {
      setError('Something went wrong...');
      if (flagSetterFunc) {
        flagSetterFunc(false);
      }
      return;
    }
    const createdComment = await response.data.comment;
    const idx = newPost.comments.findIndex((comment) => comment._id === createdComment._id);
    if (idx === -1) {
      newPost.comments.push(createdComment);
    } else {
      const newComments = [...newPost.comments];
      newComments[idx] = createdComment;
      newPost.comments = newComments;
    }
    setPost(newPost);
    if (flagSetterFunc) {
      flagSetterFunc(false);
    }
  } catch {
    setError('Something went wrong...');
  }
};

export const fetchFollowUpdate = async (userId, currentUser, isFriend, setUser) => {
  const friends = [...currentUser.followedUsers];
  if (isFriend) {
    friends.filter((id) => id !== userId);
  } else {
    friends.push(userId);
  }
  const response = await updateMeFriends({ followedUsers: friends });
  if (response.status !== 200) {
    return false;
  }
  setUser({ ...currentUser, followedUsers: friends });
  return true;
};
