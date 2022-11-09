import { useSelector } from 'react-redux';

import { Alert } from 'react-bootstrap';

const Notify = () => {
  const notificationMessage = useSelector((state) => state.notification);

  const renderNotification = () => {
    if (notificationMessage.error) {
      return <Alert variant='danger'>{notificationMessage.error}</Alert>;
    } else if (notificationMessage.success) {
      return <Alert variant='success'>{notificationMessage.success}</Alert>;
    }
  };

  return <div>{renderNotification()}</div>;
};

export default Notify;
