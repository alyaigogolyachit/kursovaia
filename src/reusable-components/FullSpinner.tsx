import PuffLoader from "react-spinners/PuffLoader"
import { CSSProperties } from "react"
const FullSpinner = () => {
  const override: CSSProperties = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: "1000",
    transform: "translate(-50%, -50%)",
    margin: "0 auto",
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <PuffLoader size={100} color="#005eff" cssOverride={override} />
    </div>
  )
}
export default FullSpinner
