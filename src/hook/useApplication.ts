// // src/hooks/useApplicationForm.ts
// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '../store';


// export const useApplicationForm = () => {
//   const dispatch = useDispatch();
//   const { step, data } = useSelector((state: RootState) => state.application);

//   const nextStep = (data: any) => {
//     dispatch(updateData(data));
//     dispatch(updateStep(currentStep + 1));
//   };

//   const prevStep = () => {
//     dispatch(updateStep(currentStep - 1));
//   };

//   return { currentStep, formData, nextStep, prevStep };
// };