import { Modal } from "react-bootstrap";
import testimg from "../../../assets/bullvsbear.jpg";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/slices/modal-state-slice";
import "./chart-img-modal.scss";
import { useEffect } from "react";
import { useRef } from "react";

const ChartImgModal = () => {
  const dispatch = useDispatch();
  const showChart = useSelector((state) => state.modal.chartModalState);
  const imgUrl = useSelector((state) => state.modal.imgUrl);

  console.log(imgUrl);
  useEffect(() => {

  },[])

  return (
    <Modal
      show={showChart}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-container"
      contentClassName="h-100 p-0"
      keyboard={true}
      onHide={() => {
        dispatch(modalActions.closeModal());
      }}
      centered
    >
      <Modal.Body className="img-container">
        <img src={imgUrl} className="chart-img" alt="chart picture" />
      </Modal.Body>
    </Modal>
  );
};

export default ChartImgModal;
