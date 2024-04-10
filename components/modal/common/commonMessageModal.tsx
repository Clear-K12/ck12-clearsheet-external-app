import React from "react";
import { Button, Modal } from "react-bootstrap";
const CommonMessageModal = (props: any) => {
  let {showMessageModal,setShowMessageModal,message,title,showPropsMessage} = props;
  
  const close_modal = () => {
    setShowMessageModal(false)
  }
  return (
    <>
      <Modal show={showMessageModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showPropsMessage?message:
        (<div>Please check your email to verify your email address. Click the link in the email to verify and log in. <br/> <strong>If you do not see the email, please check your spam folder</strong> or email support@everychildgrows.com for further help.</div>)
        }</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={close_modal}>
            OK
          </Button>          
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CommonMessageModal;
