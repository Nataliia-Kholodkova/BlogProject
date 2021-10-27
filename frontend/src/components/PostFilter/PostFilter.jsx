import React from 'react';
import Input from '../UI/Form/Input';

const PostFilter = ({ filter, setFilter }) => (
  <>
    <Input
      type="search"
      placeholder="Search posts by tag"
      name="tagName"
      value={filter.tagName}
      onChange={(event) => setFilter({ ...filter, tagName: event.target.value })}
      className="inputForText"
      labelClassName="labelForText"
    />
    <div>
      <Input
        type="radio"
        name="sortOrder"
        value="random"
        onChange={(event) => setFilter({ ...filter, order: event.target.value })}
        className="inputForRadio"
        labelClassName="labelForRadio"
        title="Sort in random order"
        checked={filter.order === 'random'}
      />
      <Input
        type="radio"
        name="sortOrder"
        value="asc"
        onChange={(event) => setFilter({ ...filter, order: event.target.value })}
        title="Sort in ascending order"
        className="inputForRadio"
        labelClassName="labelForRadio"
        checked={filter.order === 'asc'}
      />
      <Input
        type="radio"
        name="sortOrder"
        value="desc"
        onChange={(event) => setFilter({ ...filter, order: event.target.value })}
        title="Sort in descending order"
        className="inputForRadio"
        labelClassName="labelForRadio"
        checked={filter.order === 'desc'}
      />
      {/* <label>
        <input
          type="radio"
          name="sortOrder"
          value="random"
          checked={filter.order === 'random'}
          onChange={(event) => setFilter({ ...filter, order: event.target.value })}
          title="Sort in random order"
        />
        Sort in random order
      </label> */}
      {/* <label>
        <input
          type="radio"
          name="sortOrder"
          value="asc"
          checked={filter.order === 'asc'}
          onChange={(event) => setFilter({ ...filter, order: event.target.value })}
          title="Sort in ascending order"
        />
        Sort in ascending order
      </label> */}
      {/* <label>
        <input
          type="radio"
          name="sortOrder"
          value="desc"
          checked={filter.order === 'desc'}
          onChange={(event) => setFilter({ ...filter, order: event.target.value })}
          title="Sort in descending order"
        />
        Sort in descending order
      </label> */}
    </div>
  </>
);

export default PostFilter;
