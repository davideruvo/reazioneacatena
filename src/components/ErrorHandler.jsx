import { Icon } from "#components/Utils";

const ErrorHandler = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Icon
        ico="face-frown-open"
        icoStyle="regular"
        style={{ fontSize: "8em" }}
      />
      <p style={{ fontSize: "3em" }}>Ooops!</p>
      <p style={{ fontSize: "1.5em" }}>Qualcosa non ha funzionato</p>
    </div>
  );
};

export default ErrorHandler;
