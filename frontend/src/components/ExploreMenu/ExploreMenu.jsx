import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes crafted with the 
        finest ingredients and culinary expertise. Our mission is to satisfy your cravings 
        and elevate your dining experience, one delicious meal at a time.
      </p>
      
      <div className='explore-menu__list'>
        {menu_list.map((item, idx) => {
          return (
            <div
              onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
              className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
              key={idx}
            >
              <img
                src={item.menu_image} 
                alt={item.menu_name}
                className='explore-menu__item-img'
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
