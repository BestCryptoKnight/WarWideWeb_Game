import React from 'react';
import Modal from 'react-modal'
import '../../styles/modal.css'
import DepoistCard from '../../components/cards/depositCard'
const DepositModal = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            <DepoistCard />
            <button onClick={closeModal}>Close</button>
        </Modal>
    )
}

export default DepositModal