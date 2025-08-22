export interface ILoanData {
  id: number,
  memberFullName: string,
  libraryName: string,
  startDate: Date,
  endDate: Date | null
  bookNames: string[]
};

export interface ILoanFullInfo {
  id: number,
  memberId: number,
  libraryId: number,
  startDate: Date,
  endDate: Date | null,
  booksIds: number[]
};


