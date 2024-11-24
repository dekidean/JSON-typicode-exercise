// Komponenta za greske
const ErrorMessage = ({ message }: { message: string }) => (
  <div style={{ color: "red", fontWeight: "bold", marginTop: "40px" }}>
    {message}
  </div>
);

export default ErrorMessage;
