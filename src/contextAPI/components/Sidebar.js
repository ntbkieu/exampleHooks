import React, { useContext } from 'react';
import { AppContext } from '../Context/AppProvider';
import UserInformation from './UserInfo';

export default function Sidebar() {
  const { userInfo, isOpen, themeStyle } = useContext(AppContext);
  if (!isOpen) return null;
  return (
    <div
      className='sidebar'
      style={{
        backgroundColor: 'rgb(228, 228, 228)',
        padding: 10,
        gridColumn: '1 / 2',
        gridRow: '1 / 3',
        ...themeStyle
      }}
    >
      <h2>Sidebar</h2>
      <UserInformation userInfo={userInfo} />
    </div>
  );
}