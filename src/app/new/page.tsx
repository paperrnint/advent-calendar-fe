'use client';

import Image from 'next/image';

import { Form } from '@/components/Form/Form';
import { Palette } from '@/components/Palette/Palette';
import { useBodyBackground } from '@/hooks/useBodyBackground';
import { useNewForm } from '@/hooks/useNewForm';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { UserRegisterRequest } from '@/types/api';

export default function NewPage() {
  const {
    step,
    name,
    updateName,
    resetName,
    updateColor,
    goToNextStep,
    goToPrevStep,
    getUserData,
    isNameValid,
    isColorValid,
  } = useNewForm();
  const { mutate, isPending } = useRegisterUser();

  useBodyBackground('var(--background-beige)');

  const submit = () => {
    const userData = getUserData();
    if (!isNameValid || !isColorValid || userData.color === null) {
      return;
    }
    mutate(userData as UserRegisterRequest);
  };

  return (
    <div className="bg-background-beige flex h-dvh w-full max-w-md flex-col px-4 pt-16">
      {step === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <Form.Container>
            <Form.Header>
              <Form.Subtitle>
                얼마 남지 않은 크리스마스, 크리스마스를 기다리며 산타가 특별한 선물을 준비했어요 🎁
              </Form.Subtitle>
              <Form.Title>당신의 이름은?</Form.Title>
            </Form.Header>
            <Form.Form>
              <Form.InlineContainer>
                <Form.Input
                  id="name"
                  autoComplete="name"
                  value={name}
                  placeholder="이름 (1-10자)"
                  onChange={updateName}
                  onClear={resetName}
                />
                <Form.Confirm onClick={goToNextStep} disabled={!isNameValid}>
                  확인
                </Form.Confirm>
              </Form.InlineContainer>
            </Form.Form>
          </Form.Container>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-1 items-center justify-center">
          <Form.Container>
            <Form.Header>
              <Form.Subtitle>
                얼마 남지 않은 크리스마스, 크리스마스를 기다리며 산타가 특별한 선물을 준비했어요 🎁
              </Form.Subtitle>
              <Form.Title>마음에 드는 색은?</Form.Title>
            </Form.Header>
            <Form.Form>
              <div className="mx-auto mb-8 w-68">
                <Palette onUpdate={updateColor} />
              </div>
              <Form.Action>
                <Form.Cancel onClick={goToPrevStep} disabled={isPending}>
                  이전
                </Form.Cancel>
                <Form.Confirm onClick={submit} disabled={!isColorValid || isPending}>
                  {/* @todo: isPending 처리 */}
                  확인
                </Form.Confirm>
              </Form.Action>
            </Form.Form>
          </Form.Container>
        </div>
      )}

      <div className="flex items-center justify-center">
        <Image priority src="/images/santa-bg.webp" alt="배경 이미지" width={240} height={240} />
      </div>
    </div>
  );
}
