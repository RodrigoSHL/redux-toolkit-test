import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialStateShortening } from '../../app/initialVariable';
import { RootState } from '../../app/store';
import config from '../../config';

const api_rest = config['api_sql_url'];

//Negocio
export const getAllCountries = () => (dispatch:any) => {
  axios
    .get(`${api_rest}/api/generic/country`)
    .then((response) => {
      dispatch(setShorteningCountryList(response.data));
    })
    .catch((error) => console.log(error));
};

export const getBusinessUnitByCountry = (idCountry: string) => (dispatch:any) => {
  axios
    .get(`${api_rest}/api/factor/filter`, {
      params: {
        idCountry: idCountry,
      },
    })
    .then((response) => {
      dispatch(setShorteningBusinessUnitList(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getBranchOfficeByBusinessUnit =
  (idCountry: string, idBusinessUnit: string) => (dispatch:any) => {
    axios
      .get(`${api_rest}/api/factor/filter`, {
        params: {
          idCountry: idCountry,
          idBusinessUnit: idBusinessUnit,
        },
      })
      .then((response) => {
        dispatch(setShorteningBranchOfficeList(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const getClacomDataByParameters =
  (idCountry: string, idBusinessUnit: string, idBranchOffice: string) => (dispatch:any) => {
    axios
      .get(`${api_rest}/api/factor/filter`, {
        params: {
          idCountry: idCountry,
          idBusinessUnit: idBusinessUnit,
          idBranchOffice: idBranchOffice,
        },
      })
      .then((response) => {
        dispatch(setShorteningClacomList(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const getResumeDataByParameters = (filterObject: any) => (dispatch:any) => {
  axios
    .get(`${api_rest}/api/factor/provision-resume`, {
      params: {
        country: filterObject.country,
        businessUnit: filterObject.businessUnit,
        branchOffice: filterObject.branchOffice,
        date: filterObject.date,
      },
    })
    .then((response) => {
      const newArrayFormatted = settingData(response.data);
      dispatch(setShorteningResumeList(newArrayFormatted));
    })
    .catch(function (error) {
      console.log('Error::', error);
    });
};

const settingData = (response:any) => {
  console.log('%c Respuesta desde BD', 'color: green', response);
  const newArrayResumeData: any[] = [];
  response.group_list.forEach((element:any) => {
    const data = response.group_list.find((x:any) => x.PrvClaCom === element.PrvClaCom);
    let objTemp = {
      id: element.PrvtrxTimeStamp,
      clacom: element.PrvClaCom,
      store: response.branchOffice,
      saleAmount: new Intl.NumberFormat('de-DE').format(element.PrvSalePriceNet),
      prvAmount: new Intl.NumberFormat('de-DE').format(data.PrvCostUnitAmoun) || 0,
      date: element.PrvtrxTimeStamp,
    };
    newArrayResumeData.push(objTemp);
    console.log('newArrayResumeData', newArrayResumeData);
  });
  return newArrayResumeData;
};


export const shorteningSlice = createSlice({
  name: 'shortening',
  initialState: {
    ...initialStateShortening,
  },
  reducers: {
    setShorteningCountryList: (state: any = initialStateShortening, action: any) => {
      state.listShorteningCountry = action.payload || [];
    },
    setShorteningBusinessUnitList: (state: any = initialStateShortening, action: any) => {
      state.listShorteningBusinessUnit = action.payload || [];
    },
    setShorteningBranchOfficeList: (state: any = initialStateShortening, action: any) => {
      state.listShorteningBranchOffice = action.payload || [];
    },
    setShorteningClacomList: (state: any = initialStateShortening, action: any) => {
      state.listShorteningClacomData = action.payload || [];
    },
    /* Shortening Resume */
    setShorteningResumeList: (state: any = initialStateShortening, action: any) => {
      state.listShorteningResumeData = action.payload || [];
    },
  },
});

//Action
export const {
  setShorteningCountryList,
  setShorteningBusinessUnitList,
  setShorteningBranchOfficeList,
  setShorteningClacomList,
  setShorteningResumeList,
} = shorteningSlice.actions;


//State-Reducer
export const selectShortening = (state: RootState) => state.shortening;
//Reducer
export default shorteningSlice.reducer;
