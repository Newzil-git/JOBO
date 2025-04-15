import React from 'react';

const RadarChart = ({ data, size = 250 }) => {
  // 简单实现，确保组件至少能渲染
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ margin: '5px 0' }}>
            {item.label}: {item.value}%
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: '#4CAF50' }}>
        雷达图将在这里显示
      </div>
    </div>
  );
};

export default RadarChart;