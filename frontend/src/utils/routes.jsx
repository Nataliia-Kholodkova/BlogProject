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

export const PrivateRoutes = ({ postFilter, setPostFilter }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <PostsPage filter={postFilter} setFilter={setPostFilter} />
      )}
    />
    <Route
      exact
      path="/posts"
      render={() => (
        <PostsPage filter={postFilter} setFilter={setPostFilter} />
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
      path="/posts/tag/:tag"
      render={() => (
        <PostsPage filter={postFilter} setFilter={setPostFilter} />
      )}
    />
    <Route
      exact
      path="/posts/:id"
      render={() => <PostPage setFilter={setPostFilter} />}
    />
    <Route exact path="/users" render={() => <UsersPage />} />
    <Route
      exact
      path="/users/:id"
      render={() => (
        <UserPage filter={postFilter} setFilter={setPostFilter} />
      )}
    />
    <Route exact path="/me" render={() => <Profile />} />
    <Route exact path="/me/update" render={() => <EditProfile />} />
    <Route
      exact
      path="/me/update/password"
      render={() => <ChangePassword />}
    />
  </Switch>
);

export const PublicRoutes = ({ postFilter, setPostFilter }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <PostsPage filter={postFilter} setFilter={setPostFilter} />
      )}
    />
    <Route
      exact
      path="/posts"
      render={() => (
        <PostsPage filter={postFilter} setFilter={setPostFilter} />
      )}
    />
    <Route
      exact
      path="/posts/tag/:tag"
      render={() => (
        <PostsPage filter={postFilter} setFilter={setPostFilter} />
      )}
    />
    <Route
      exact
      path="/posts/:id"
      render={() => <PostPage setFilter={setPostFilter} />}
    />
    <Route exact path="/users" render={() => <UsersPage />} />
    <Route
      exact
      path="/users/:id"
      render={() => (
        <UserPage filter={postFilter} setFilter={setPostFilter} />
      )}
    />
    <Route exact path="/signin" render={() => <SignIn />} />
    <Route exact path="/signup" render={() => <SignUp />} />
  </Switch>
);
