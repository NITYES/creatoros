
import Step1Form from '../components/application/Step1Form'
import { Briefcase, FileText, CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Step2Form from '../components/application/Step2Form';
import Step3Form from '../components/application/step3Form';


const ApplicationPage = () => {
  const { data, step } = useSelector((state: RootState) => state.application)

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Form />;
      case 2: return <Step2Form />;
      case 3: return <Step3Form />;
      default: return <Step1Form />;
    }
  };

  function handleSubmit() {
    // in real world scenario call the api
    console.log('data caputured', data)
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
      
        {/* Progress Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
              <Briefcase size={20} />
            </div>
            <div className={`h-1 w-8 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`p-2 rounded-lg ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
              <FileText size={20} />
            </div>
            <div className={`h-1 w-8 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <div className={`p-2 rounded-lg ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
              <CheckCircle size={20} />
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Step {step} of 3
          </span>
        </div>

        {/* Dynamic Content */}
        <div className="p-8 md:p-12">
          {renderStep()}
        </div>
        {step == 2 ? <button onSubmit={handleSubmit}>Submit</button> : null}
      </div>
    </div>
  );
};

export default ApplicationPage;