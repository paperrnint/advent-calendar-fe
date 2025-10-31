import { MAX_NAME_LENGTH, RibbonColor } from '@/constants';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export const useNewForm = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState<RibbonColor | null>(null);

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]*$/;

    if (regex.test(newName) && newName.length <= MAX_NAME_LENGTH) {
      setName(newName);
    }
  };

  const resetName = () => {
    setName('');
  };

  const updateColor = (newColor: RibbonColor) => {
    setColor(newColor);
  };

  const goToNextStep = () => {
    if (name.trim().length === 0) return;
    setStep(1);
  };

  const goToPrevStep = () => {
    setStep(0);
  };

  const submit = async () => {
    const userData = { name: name.trim(), color };

    try {
      // @todo: 서버에 전송
      console.log(userData);
      // router.push(`/${id}`);
    } catch (err) {
      // @todo: 잠시후 다시 시도 에러 메시지
      console.error(err);
      router.push('/');
    }
  };

  return {
    // State
    step,
    name,
    color,
    id,

    // Handlers
    updateName,
    resetName,
    updateColor,
    goToNextStep,
    goToPrevStep,
    submit,

    // Computed
    isNameValid: name.trim().length > 0,
    isColorValid: color !== null,
  };
};
