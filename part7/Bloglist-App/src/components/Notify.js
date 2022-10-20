import { useSelector } from 'react-redux';

const Notify = () => {
  const notificationMessage = useSelector((state) => state.notification);

  const notificationStyles = (color) => {
    return {
      color: color,
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    };
  };

  const renderNotification = () => {
    if (notificationMessage.error) {
      return (
        <div id='error' style={notificationStyles('rgb(255, 0, 0)')}>
          {notificationMessage.error}
        </div>
      );
    } else if (notificationMessage.success) {
      return (
        <div id='success' style={notificationStyles('rgb(0, 128, 0)')}>
          {notificationMessage.success}
        </div>
      );
    }
  };

  return <div>{renderNotification()}</div>;
};

export default Notify;
