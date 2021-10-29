import { useMemo } from 'react';

const useSelectedPosts = (posts, tagName) => useMemo(() => (tagName
  ? posts.filter((post) => post.tags.map((tag) => tag.toLowerCase())
    .includes(tagName.toLowerCase()))
  : posts), [tagName, posts]);

export default useSelectedPosts;
