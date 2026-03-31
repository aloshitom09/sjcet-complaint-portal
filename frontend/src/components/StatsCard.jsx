import React from 'react';

const StatsCard = ({ title, count, colorClass }) => {
    return (
        <div className={`stat-card border-top border-4 ${colorClass}`}>
            <span className="stat-label">{title}</span>
            <span className="stat-value">{count}</span>
        </div>
    );
};

export default StatsCard;
