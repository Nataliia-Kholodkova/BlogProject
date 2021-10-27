import { useMemo } from 'react';

const useSortPosts = (posts, order) => (
  useMemo(() => {
    switch (order) {
      case 'asc':
        return posts.sort(
          (a, b) => new Date(b.publishDate).getTime()
                  - new Date(a.publishDate).getTime(),
        );
      case 'desc':
        return posts.sort(
          (a, b) => new Date(a.publishDate).getTime()
                  - new Date(b.publishDate).getTime(),
        );
      default:
        return posts;
    }
  }, [posts, order])
);

const useSortedAndSelectedPosts = (posts, tagName, order) => {
  const sortedPosts = useSortPosts(posts, order);
  return useMemo(() => (tagName
    ? posts.filter((post) => post.tags.map((tag) => tag.toLowerCase())
      .includes(tagName.toLowerCase()))
    : sortedPosts), [sortedPosts, tagName]);
};

export default useSortedAndSelectedPosts;
