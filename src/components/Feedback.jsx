import { RiErrorWarningLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";

const Feedback = ({ className, text, loading }) => {
  return (
    <>
      <h3 className={className}>
        {/* spinning loading indicator */}
        {loading ? <VscLoading size={50} className="loading-icon" /> : null}
        {className === "feedbcak error" ? (
          <RiErrorWarningLine className="icon" />
        ) : null}
        {text}
      </h3>
    </>
  );
};

export default Feedback;
