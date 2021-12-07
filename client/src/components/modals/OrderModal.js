import { Modal } from 'antd';

/*
 * Method to handle order modal to
 */
const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <Modal
      visible={showModal}
      title="Order payment info"
      onCancel={handleCancel}
    >
      <p>Payment intent: {session.payment_intent}</p>
      <p>Payment Status: {session.payment_status}</p>
      <p>
        Amount total:
        {session.currency.toUpperCase()}
        {'  '}
        {session.amount_total / 100}
      </p>
      <p>Stripe customer id: {session.customer}</p>
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
};
export default OrderModal;
