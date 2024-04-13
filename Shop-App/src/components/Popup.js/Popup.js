import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { formatPrice } from "../../function.js";
import Button from "../Button/Button";
import IconClose from "../UI/IconClose";
import IconCart from "../UI/IconCart";
import classes from "./Popup.module.css";

const Popup = forwardRef(function (props, ref) {
  const data = useSelector((state) => state.pickedProduct.data);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function hanleCloseModal() {
    dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className={classes.dialog}>
      {data && (
        <Row className="p-4">
          <Col className="p-4 d-none d-sm-block">
            <img src={data.img1} alt={data.name} />
          </Col>
          <Col className={classes.text}>
            <h3>{data.name}</h3>
            <p>{formatPrice(data.price)}</p>
            <p>{data["short_desc"]}</p>
            <Button to={`/detail/${data["_id"]["$oid"]}`}>
              <IconCart width="20px" fill="#fff" /> View Detail
            </Button>
            <div className={classes.close} onClick={hanleCloseModal}>
              <IconClose />
            </div>
          </Col>
        </Row>
      )}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Popup;
