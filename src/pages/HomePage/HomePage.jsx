import React from 'react';
import HomeBanner from '../../Components/HomeBanner/HomeBanner';
import ListMovie from '../../Components/ListMovie/ListMovie';


const HomePage = () => {

  return (
    <div>
      <HomeBanner/>
      {/* Danh sách phim  */}
      <ListMovie/>
    </div>
  )
}

export default HomePage;