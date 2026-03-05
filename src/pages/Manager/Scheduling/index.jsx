import React, { useState } from 'react';
import StepProgress from './components/StepProgress';
import Step1_InitPlan from './components/Step1_InitPlan'; // Bước 1: Khởi tạo tuần
import Step2_Quota from './components/Step2_Quota';        // Bước 2: Định mức (trước là Step1_InitQuota)
import Step3_Registration from './components/Step3_Registration'; // Bước 3: Đăng ký
import Step4_AutoMatch from './components/Step4_AutoMatch';      // Bước 4: AI chạy
import Step5_FinalEdit from './components/Step5_FinalEdit';      // Bước 5: Chốt lịch
import ShiftGrid from './components/ShiftGrid';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const SchedulingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [globalQuotas, setGlobalQuotas] = useState({});

  // Xử lý chuyển từ Khởi tạo sang Định mức
  const handleStartInit = () => {
    setCurrentStep(2);
  };

  // Xử lý từ Định mức sang Mở đăng ký
  const handleQuotaComplete = (quotas) => {
    setGlobalQuotas(quotas);
    setCurrentStep(3);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_InitPlan onNext={handleStartInit} />;
      case 2:
        return <Step2_Quota onNext={handleQuotaComplete} />;
      case 3:
        return <Step3_Registration onNext={() => setCurrentStep(4)} />;
      case 4:
        return <Step4_AutoMatch onComplete={() => setCurrentStep(5)} />;
      case 5:
        return <Step5_FinalEdit />;
      default:
        return <Step1_InitPlan onNext={handleStartInit} />;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-6 pb-20 bg-[#F8F9FD]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <CalendarIcon size={24} />
            </div>
            Xếp ca tuần
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium ml-1">Hệ thống lập lịch tự động Hải Xồm HR</p>
        </div>
        
        <div className="flex items-center bg-white rounded-2xl p-1.5 border border-slate-100 shadow-sm font-bold text-indigo-600 text-sm">
          <div className="px-4 py-2 bg-indigo-50 rounded-xl mr-2">Tuần tới</div>
          09/03 - 15/03
        </div>
      </div>

      {/* Thanh trạng thái 5 bước */}
      <StepProgress currentStep={currentStep} />

      {/* Nội dung thay đổi động theo Step */}
      <div className="min-h-[350px]">
        {renderStepContent()}
      </div>

      {/* Lưới hiển thị đối soát */}
      <div>
        <ShiftGrid quotas={globalQuotas} currentStep={currentStep} />
      </div>
    </div>
  );
};

export default SchedulingPage;