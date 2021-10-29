import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PostsPage from '../components/Pages/PostsPage';
import PostPage from '../components/Pages/PostPage';
import UsersPage from '../components/Pages/UsersPage';
import UserPage from '../components/Pages/UserPage';
import SignIn from '../components/Pages/SignIn';
import SignUp from '../components/Pages/SignUp';
import PostCreateUpdate from '../components/Pages/PostCreateUpdate';
import EditProfile from '../components/Pages/EditProfile';
import ChangePassword from '../components/Pages/ChangePassword';
import Profile from '../components/Profile/Profile';
import Page404 from '../components/Pages/Page404';
import {
  getPosts, getLikedPosts, getUsers, getFollowedUsers,
} from './processData';

export const PrivateRoutes = ({
  tag, setTag, reset, setReset,
}) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <PostsPage
          tag={tag}
          setTag={setTag}
          setPostsFunction={getPosts}
          reset={reset}
          setReset={setReset}
        />
      )}
    />
    <Route
      exact
      path="/posts"
      render={() => (
        <PostsPage
          tag={tag}
          setTag={setTag}
          setPostsFunction={getPosts}
          reset={reset}
          setReset={setReset}
        />
      )}
    />
    <Route
      exact
      path="/posts/update/:id"
      render={() => <PostCreateUpdate />}
    />
    <Route
      exact
      path="/posts/create/new"
      render={() => <PostCreateUpdate />}
    />
    <Route
      exact
      path="/posts/:id"
      render={() => <PostPage setTag={setTag} tag={tag} />}
    />
    <Route
      exact
      path="/posts/me/liked"
      render={() => <PostsPage setTag={setTag} tag={tag} setPostsFunction={getLikedPosts} />}
    />
    <Route exact path="/users" render={() => <UsersPage setUsersFunction={getUsers} />} />
    <Route exact path="/users/me/followed" render={() => <UsersPage setUsersFunction={getFollowedUsers} />} />
    <Route
      exact
      path="/users/:id"
      render={() => (
        <UserPage tag={tag} setTag={setTag} />
      )}
    />
    <Route exact path="/me" render={() => <Profile />} />
    <Route exact path="/me/update" render={() => <EditProfile />} />
    <Route
      exact
      path="/me/update/password"
      render={() => <ChangePassword />}
    />
    <Route component={Page404} />
  </Switch>
);

export const PublicRoutes = ({ tag, setTag }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <PostsPage tag={tag} setTag={setTag} setPostsFunction={getPosts} />
      )}
    />
    <Route
      exact
      path="/posts"
      render={() => (
        <PostsPage tag={tag} setTag={setTag} setPostsFunction={getPosts} />
      )}
    />
    <Route
      exact
      path="/posts/:id"
      render={() => <PostPage tag={tag} setTag={setTag} />}
    />
    <Route exact path="/users" render={() => <UsersPage setUsersFunction={getUsers} />} />
    <Route exact path="/signin" render={() => <SignIn />} />
    <Route exact path="/signup" render={() => <SignUp />} />
    <Route component={Page404} />
  </Switch>
);
