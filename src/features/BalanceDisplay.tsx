import { useSelector } from "react-redux";
import { RootState } from "../reducers/rootReducer";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useSelector((store: RootState) => store.account);

  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
