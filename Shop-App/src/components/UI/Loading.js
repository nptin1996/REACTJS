import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-end">
      <Spinner animation="border" variant="secondary" className="me-2" />
      <h6 className="text-secondary">Loading...</h6>
    </div>
  );
}

export default Loading;
