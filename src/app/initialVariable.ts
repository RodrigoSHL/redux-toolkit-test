/* Shortening */
export const initialStateShortening = {
  listShorteningCountry: [],
  listShorteningBusinessUnit: [],
  listShorteningBranchOffice: [],
  listShorteningClacomData: [],
  listShorteningResumeData: [],
};

/* Params/Maintainer */
export const initialStateParam = {
  listAllCountry: [],
  listAllBusinessUnit: [],
  listAllBranchOffice: [],
  listAllClacom: [],
};

/* AccountBalance */
export const initialStateAccountBalance = {
  listDataAccountBalance: []
};

/* Usuario */
export const initialStateGetUser = {
  idUser: 0,
  mailUser: '',
  firstNameUser: '',
  lastNameUser: '',
  displayNameUser: '',
  stateUser: false,
};

export const initialStateUser = {
  listUsers: [],
  listAllUsers: [],
  dataUser: {...initialStateGetUser},
};