import { css } from '@emotion/react';
import { COLOR, COLOR_OPACITY } from '@/constants/color';
import { FONT_SIZE, FONT_WEIGHT } from '@/constants/font';

interface RadioOptionProps {
  text: string;
  value: string;
}

interface RadioBtnProps {
  options: RadioOptionProps[];
  name: string;
  selected: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioBtnProps> = ({
  options,
  name,
  selected,
  onChange,
}) => (
  <>
    {options.map((option) => (
      <label key={option.value} css={labelWrapperStyle}>
        <input
          type='radio'
          name={name}
          checked={selected === option.value}
          onChange={() => onChange(option.value)}
        />
        {option.text}
      </label>
    ))}
  </>
);

const labelWrapperStyle = css`
  display: flex;
  align-items: center;

  font-size: ${FONT_SIZE.TEXT_MD};
  font-weight: ${FONT_WEIGHT.REGULAR};
  letter-spacing: -0.32px;

  input[type='radio'] {
    width: 24px;
    height: 24px;
    margin: 12px;
    accent-color: ${COLOR.PRIMARY};
  }
`;

export default RadioButton;
