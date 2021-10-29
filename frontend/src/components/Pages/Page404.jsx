import React from 'react';
import notFound from '../../assets/404.png';
import Image from '../Common/Image/Image';

const Page404 = () => (
  <>
    <div className="errorContainer">
      <Image src={notFound} alt="Not found" className="imgError" />
      <h1 className="errorTitle">Whoops!</h1>
      <p className="errorText">Looks like you are lost. But don&apos;t worry there is plenty to see!!</p>
    </div>
  </>
);

export default Page404;
