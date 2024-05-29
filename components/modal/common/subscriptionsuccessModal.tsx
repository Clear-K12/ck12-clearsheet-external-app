import ALERTMESSAGES from "@constants/alertMessages"
import Head from "next/head"
import { Modal } from "react-bootstrap"

const SubscriptionSuccessModal = () => {
    return (
        <>
            <Modal show={true}>
                <Modal.Header>
                    <Modal.Title>Subscription Success</Modal.Title>
                </Modal.Header>
                <Modal.Body><strong>Clearly a Pro (Full Featured) Subscription Activated</strong>
                    <div className="mt-2">
                        {ALERTMESSAGES.VERIFYEMAIL}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default SubscriptionSuccessModal