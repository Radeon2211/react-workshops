import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { emit } from '../pages/map/mediator';

const colors = {
  orange: {
    background: '#ff7e23e0',
    shadow: '#ffa769',
  },
  blue: {
    background: '#237bffe0',
    shadow: '#698bff',
  },
};

const Circle = styled.div`
  background-color: ${({ color }) => colors[color].background};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0 0 5px ${({ color }) => colors[color].shadow};
  opacity: 0.7;
  transition: all 0.2s ease-in;
  transform: scale(0.95);
  cursor: pointer;

  &:hover {
    opacity: 1;
    transform: scale(1);
  }
`;

export default function Marker({ title, color }) {
  function handleClick() {
    emit('markerClicked', title);
  }

  return (
    <Tooltip title={title}>
      <Circle onClick={handleClick} color={color} />
    </Tooltip>
  );
}

Marker.defaultProps = {
  color: 'orange',
};
