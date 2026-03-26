import React, { useState } from 'react';
import StepProgress from './components/StepProgress';
import Step1_Initialize from './components/Step1_InitPlan';
import Step5_FinalEdit from './components/Step5_FinalEdit'; 
import FinalScheduleView from './components/FinalScheduleView';

const SchedulingPage = () => {
  // Bắt đầu từ bước 1 (Khởi tạo)
  const [currentStep, setCurrentStep] = useState(1); 
  const [scheduleData, setScheduleData] = useState({});

  // Hàm chuyển từ Bước 1 -> Bước 2
  const goToStep2 = (data) => {
    if (data) setScheduleData(data);
    setCurrentStep(2);
  };

  // Hàm chuyển từ Bước 2 -> Bước 3 (Nút Xuất bản lịch)
  const goToStep3 = (finalData) => {
    if (finalData) setScheduleData(finalData);
    setCurrentStep(3);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Thanh tiến trình luôn hiện ở trên cùng */}
      <StepProgress currentStep={currentStep} />

      <div className="mt-8">
        {/* BƯỚC 1: KHỞI TẠO */}
        {currentStep === 1 && (
          <Step1_Initialize onNext={goToStep2} />
        )}

        {/* BƯỚC 2: XẾP CA (Đây là phần bạn đang bị lỗi không hiện) */}
        {currentStep === 2 && (
          <Step5_FinalEdit 
            initialData={scheduleData} 
            onPublish={goToStep3} 
            onBack={() => setCurrentStep(1)}
          />
        )}

        {/* BƯỚC 3: LỊCH CHÍNH THỨC */}
        {currentStep === 3 && (
          <FinalScheduleView 
            realData={scheduleData} 
            onBackToEdit={() => setCurrentStep(2)} 
          />
        )}
      </div>
    </div>
  );
};

export default SchedulingPage;