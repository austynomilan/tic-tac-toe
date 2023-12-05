import React, { useState } from 'react';

export default function Player({ name, symbol, isActive }) {
  const [isName, setIsName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => {
    setIsEditing((editing) => !editing);
  };
  const handleChangeName = (event) => {
    setIsName(event.target.value);
  };
  let playerName = <span className='player-name'>{isName}</span>;

  if (isEditing) {
    playerName = (
      <input type='text' required value={isName} onChange={handleChangeName} />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {playerName}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
