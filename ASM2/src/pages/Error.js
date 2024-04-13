import NavBar from "../component/NavBar/NavBar";
function ErrorPage() {
  return (
    <>
      <NavBar />
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontStyle: "italic",
          }}
        >
          404. Page Not Found!
        </h1>
      </div>
    </>
  );
}

export default ErrorPage;
