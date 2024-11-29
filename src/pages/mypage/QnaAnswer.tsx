import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ProfileImage from '@/components/ProfileImage';
import Tag from '@/components/Tag';
import TextArea from '@/components/TextArea';
import TextInput from '@/components/TextInput';
import { COLOR, COLOR_OPACITY } from '@/constants/color';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/font';
import { PATH } from '@/constants/path';
import {
  useGetInquiryDetailTrader,
  useCreateAnswer,
} from '@/hooks/useCommonApi';
import useModalStore from '@/stores/useModalStore';

interface InquiryDataTypes {
  inquiryId: number;
  inquiryTitle: string;
  inquiryContent: string;
  inquiryStatus: string;
  inquiryRegistrationDate: string;
  inquirerNickname: string;
  strategyName: string;
  traderNickname: string;
}

type InputStateTypes = 'normal' | 'warn';

const QnaAnswer = () => {
  const [status, setStatus] = useState<InputStateTypes>('normal');
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const navigate = useNavigate();
  const { inquiryId } = useParams<{ inquiryId: string }>();
  const { openModal } = useModalStore();

  const { data: inquiryData, isError } = useGetInquiryDetailTrader({
    inquiryId: Number(inquiryId),
  });

  if (isError) {
    openModal('get-inquiry-error');
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatus(value.trim() === '' ? 'warn' : 'normal');
    setTitleValue(value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue(e.target.value);
  };

  const createAnswer = useCreateAnswer();
  const handleSubmit = () => {
    if (!titleValue.trim() || !contentValue.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    createAnswer.mutate(
      {
        inquiryId: Number(inquiryId),
        answerTitle: titleValue,
        answerContent: contentValue,
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

  const handleBack = () => {
    navigate(PATH.MYPAGE_QNA_DETAIL());
  };

  const isSubmitDisabled = !titleValue.trim() || !contentValue.trim();

  return (
    <div css={wrapperStyle}>
      <span css={pageInfoStyle}>답변하기</span>

      {inquiryData && (
        <div className='question-section' css={titleWrapperStyle}>
          <span css={titleStyle}>{inquiryData.inquiryTitle}</span>
          <span css={statusStyle}>{inquiryData.inquiryStatus}</span>
          <div css={infoStyle}>
            <div css={dateAndWriterStyle}>
              <div css={dateStyle}>
                <span css={dateNameStyle}>작성일</span>
                <span>{inquiryData.inquiryRegistrationDate}</span>
              </div>
              <div css={writerStyle}>
                <span css={writerNameStyle}>작성자</span>
                <span>{inquiryData.inquirerNickname}</span>
              </div>
            </div>
          </div>

          <div css={strategyWrapperStyle}>
            <div css={tagsAndTitleStyle}>
              <div css={tagStyle}>
                <Tag src='default-tag.png' alt='tag' />
              </div>
              <div css={strategyTextStyle}>{inquiryData.strategyName}</div>
            </div>
            <div css={profileStyle}>
              <ProfileImage
                src='default-profile.png'
                alt='profileImg'
                size='md'
              />
              <span css={nicknameStyle}>{inquiryData.traderNickname}</span>
            </div>
          </div>

          <div css={inputStyle}>{inquiryData.inquiryContent}</div>
        </div>
      )}

      <div className='comment-section' css={answerWrapperStyle}>
        <div css={answerNameStyle}>
          <TextInput
            value={titleValue}
            status={status}
            placeholder='제목을 입력해주세요.'
            fullWidth
            handleChange={handleTitleChange}
          />
        </div>
        <div css={answerStyle}>
          <TextArea
            value={contentValue}
            placeholder='내용을 입력해주세요.'
            fullWidth
            handleChange={handleContentChange}
          />
        </div>
      </div>

      <div css={goDetailBtnStyle}>
        <Button
          label='이전'
          handleClick={handleBack}
          color='primaryOpacity10'
          size='md'
          shape='square'
          width={120}
          border
        />
        <Button
          label='답변완료'
          handleClick={handleSubmit}
          color='primary'
          size='md'
          shape='square'
          width={120}
          disabled={isSubmitDisabled}
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
            <p css={modalTextStyle}>답변 등록에 실패했습니다.</p>
          </div>
        }
      />
    </div>
  );
};

export default QnaAnswer;

const wrapperStyle = css`
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 181px;
`;
const pageInfoStyle = css`
  font-size: ${FONT_SIZE.TITLE_SM};
  font-weight: ${FONT_WEIGHT.BOLD};
  align-self: flex-start;
`;
const titleWrapperStyle = css`
  margin-top: 40px;
  width: 100%;
  padding: 16px;
  background-color: ${COLOR.GRAY100};
  position: relative;
`;

const titleStyle = css`
  font-size: ${FONT_SIZE.TITLE_XS};
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const statusStyle = css`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: ${FONT_SIZE.TEXT_MD};
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const infoStyle = css`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const dateAndWriterStyle = css`
  display: flex;
  align-items: center;
  margin-top: 16px;
  gap: 32px;
`;

const dateStyle = css`
  display: flex;
  gap: 8px;
`;

const dateNameStyle = css`
  font-weight: ${FONT_WEIGHT.MEDIUM};
`;

const writerStyle = css`
  display: flex;
  gap: 8px;
`;

const writerNameStyle = css`
  font-weight: ${FONT_WEIGHT.MEDIUM};
`;

const strategyWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px;
  width: 1132px;
  border: 1px solid ${COLOR_OPACITY.BLACK_OPACITY30};
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  margin-top: 24px;
`;

const tagsAndTitleStyle = css`
  display: flex;
  flex-direction: column;
`;

const tagStyle = css`
  display: flex;
  gap: 8px;
`;

const strategyTextStyle = css`
  margin-top: 16px;
  font-size: ${FONT_SIZE.TEXT_MD};
  font-weight: ${FONT_WEIGHT.REGULAR};
`;

const profileStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const nicknameStyle = css`
  font-size: ${FONT_SIZE.TEXT_MD};
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const inputStyle = css`
  margin-top: 32px;
  padding: 20px 36px;
  width: 100%;
  min-height: 300px;
`;

const answerWrapperStyle = css`
  width: 100%;
  padding: 0 24px;
  background-color: ${COLOR.GRAY100};
  position: relative;
`;

const answerNameStyle = css`
  margin-top: 42px;
`;

const answerStyle = css`
  margin-top: 32px;
  margin-bottom: 40px;
`;

const goDetailBtnStyle = css`
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
