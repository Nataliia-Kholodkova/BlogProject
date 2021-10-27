import React, { useRef } from 'react';
import styles from './Aside.module.css';
import PostFilter from '../PostFilter/PostFilter';
import Button from '../UI/Button/Button';
import Arrow from '../Common/Image/Arrow';

const Aside = ({ filter, setFilter }) => {
  const ref = useRef(null);
  const toggleClassRef = () => ref.current.classList.toggle(styles.open);
  return (
    <aside className={styles.aside} ref={ref}>
      <Button onClick={toggleClassRef} className="arrowButton" type="button" isMobile>
        <Arrow />
      </Button>
      <PostFilter filter={filter} setFilter={setFilter} />
    </aside>
  );
};

export default Aside;
