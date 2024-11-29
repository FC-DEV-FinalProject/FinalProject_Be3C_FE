import { useState } from 'react';
import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/font';
import { PATH } from '@/constants/path';
import { useGetEditInquiry, useUpdateInquiry } from '@/hooks/useCommonApi';
import useModalStore from '@/stores/useModalStore';

type InputStateTypes = 'normal' | 'warn';

const MyQnaEdit = () => {
  const [status, setStatus] = useState<InputStateTypes>('normal');
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const { openModal } = useModalStore();

  const navigate = useNavigate();
  const { inquiryId } = useParams<{ inquiryId: string }>();

  const { data: inquiryData, isError } = useGetEditInquiry({
    inquiryId: Number(inquiryId),
  });

  if (isError) {
    openModal('get-inquiry-error');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTitleValue(inputValue);

    if (inputValue.length < 1) {
      setStatus('warn');
    } else {
      setStatus('normal');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const updateMutation = useUpdateInquiry();

  const handleSubmit = () => {
    if (!titleValue.trim() || !contentValue.trim()) {
      openModal('create-confirm');
      return;
    }

    updateMutation.mutate(
      {
        inquiryId: Number(inquiryId),
        inquiryTitle: titleValue,
        inquiryContent: contentValue,
      },
      {
        onSuccess: () => {
          navigate(PATH.MYPAGE_QNA_DETAIL());
        },
        onError: () => {
          openModal('create-confirm');
        },
      }
    );
  };

  const handleBtn = () => {
    navigate(PATH.MYPAGE_QNA_DETAIL());
  };

  return (
    <div css={wrapperStyle}>
      <div css={inputWrapperStyle}>
        <div css={titleStyle}>문의글 수정</div>
        <div>
          {inquiryData && (
            <>
              <div css={questionNameStyle}>
                <TextInput
                  value={titleValue || inquiryData.inquiryTitle}
                  status={status}
                  placeholder='제목을 입력해주세요.'
                  fullWidth
                  handleChange={handleChange}
                />
              </div>
              <div css={questionStyle}>
                <TextArea
                  value={contentValue || inquiryData.inquiryContent}
                  placeholder='내용을 입력해주세요.'
                  fullWidth
                  handleChange={handleTextChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div css={buttonStyle}>
        <Button
          label='이전'
          handleClick={handleBtn}
          color='primaryOpacity10'
          size='md'
          shape='square'
          width={120}
          border
        />
        <Button
          label='수정완료'
          handleClick={handleSubmit}
          color='primary'
          size='md'
          shape='square'
          width={120}
        />
      </div>
      <Modal
        id='get-inquiry-error'
        content={
          <div css={modalContentStyle}>
            <p css={modalTextStyle}>문의 내역 조회에 실패했습니다.</p>
          </div>
        }
      />
      <Modal
        id='create-confirm'
        content={
          <div css={modalContentStyle}>
            <p css={modalTextStyle}>문의 내용 수정에 실패했습니다.</p>
          </div>
        }
      />
    </div>
  );
};

export default MyQnaEdit;

const wrapperStyle = css`
  padding-top: 96px;
  padding-bottom: 227px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
`;

const inputWrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const titleStyle = css`
  font-size: ${FONT_SIZE.TITLE_SM};
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const questionNameStyle = css`
  margin-top: 32px;
`;

const questionStyle = css`
  margin-top: 40px;
`;

const buttonStyle = css`
  margin-top: 80px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const modalContentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const modalTextStyle = css`
  font-size: ${FONT_SIZE.TEXT_LG};
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;
`;
