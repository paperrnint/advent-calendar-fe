import { useState } from 'react';
import { MAX_NAME_LENGTH, RibbonColor } from '@/constants';

export const useNewForm = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState<RibbonColor | null>(null);

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

  const getUserData = () => {
    return {
      name: name.trim(),
      color,
    };
  };

  return {
    // State
    step,
    name,
    color,

    // Handlers
    updateName,
    resetName,
    updateColor,
    goToNextStep,
    goToPrevStep,
    getUserData,

    // Computed
    isNameValid: name.trim().length > 0,
    isColorValid: color !== null,
  };
};
