module {
  // Nanoseconds since the Unix epoch (UTC).
  public type Timestamp = Int;

  // Money amounts in whole Indian Rupees (no paise).
  public type Money = Nat;

  // A percentage value, e.g. 10.0 means 10%.
  public type Percent = Float;

  // Annual interest rate as a percentage, e.g. 8.5 means 8.5% per annum.
  public type InterestRate = Float;

  // Loan tenure in months.
  public type TenureMonths = Nat;

  // Moratorium period in months.
  public type MoratoriumMonths = Nat;
};
