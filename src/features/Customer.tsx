import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";

function Customer() {
  const customerName = useSelector(
    (state: RootState) => state.customer.fullName
  );

  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
