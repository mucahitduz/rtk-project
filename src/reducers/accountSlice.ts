import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface State {
  balance: number;
  loan: number;
  loanPurpose: string;
}

const initialState: State = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export const deposit = createAsyncThunk(
  "account/deposit",
  async ({ amount, currency }: { amount: number; currency: string }) => {
    try {
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
      );
      const data = await res.json();

      const converted = (amount * data.rates.USD).toFixed(2);
      return Number(converted);
    } catch (err) {
      console.error(err);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    withdraw(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(
        state,
        action: PayloadAction<{ amount: number; purpose: string }>
      ) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deposit.fulfilled, (state, action) => {
        state.balance += action.payload!;
      })
      .addCase(deposit.rejected, (state, action) => {
        console.error("state and payload", state, action.payload);
      });
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
