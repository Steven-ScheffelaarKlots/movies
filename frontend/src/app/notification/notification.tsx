import React, { useEffect, useState } from 'react';
import './notification.css';

interface NotificationProps {
    message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="notification">
            {message}
        </div>
    );
};

export default Notification;