import { useState, FormEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select'; // Проверь путь, если нужно поправь
import {
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  defaultArticleState,
  ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onApply: (next: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ isOpen, onToggle, onApply }: Props) => {
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const handleChange = <K extends keyof ArticleStateType>(
    key: K,
    value: ArticleStateType[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onApply(formState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(val) => handleChange('fontFamilyOption', val)}
          />
          <Select
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(val) => handleChange('fontSizeOption', val)}
          />
          <Select
            title="Цвет текста"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(val) => handleChange('fontColor', val)}
          />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(val) => handleChange('backgroundColor', val)}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(val) => handleChange('contentWidth', val)}
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="button"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
