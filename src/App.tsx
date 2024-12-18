import CreateCustomer from "./features/CreateCustomer";
import AccountOperations from "./features/AccountOperations";
import BalanceDisplay from "./features/BalanceDisplay";
import Customer from "./features/Customer";
import { useSelector } from "react-redux";
import { RootState } from "./reducers/rootReducer";

function App() {
  const fullName = useSelector((state: RootState) => state.customer.fullName);

  return (
    <div>
      <h1>The React-Redux Toolkit Bank App</h1>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
