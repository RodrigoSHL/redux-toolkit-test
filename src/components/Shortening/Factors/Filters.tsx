import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllCountries, selectShortening } from '../../../features/shortening/shorteningSlice';

const Filters = () => {
  const dispatch = useAppDispatch();

  const { listShorteningCountry: COUNTRIES} = useAppSelector(selectShortening);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);
  
  return (
    <div>Filters</div>
  )
}

export default Filters