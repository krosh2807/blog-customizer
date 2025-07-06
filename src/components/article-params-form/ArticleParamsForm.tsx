import { useState, FormEvent, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';

type Props = {
	isOpen: boolean;
	onToggle: () => void;
	articleStyle: ArticleStateType;
	setArticleStyle: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	articleStyle,
	setArticleStyle,
}: Props) => {
	const [formState, setFormState] = useState<ArticleStateType>(articleStyle);

	useEffect(() => {
		setFormState(articleStyle);
	}, [articleStyle]);

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleStyle(defaultArticleState);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleStyle(formState);
	};

	return (
		<aside
			className={clsx(styles.container, {
				[styles.container_open]: isOpen,
			})}>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />

			<form className={styles.form} onSubmit={handleSubmit}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>

				<Select
					title='Шрифт'
					options={fontFamilyOptions}
					selected={formState.fontFamilyOption}
					onChange={(val) => handleChange('fontFamilyOption', val)}
				/>

				<RadioGroup
					name='fontSize'
					selected={formState.fontSizeOption}
					options={fontSizeOptions}
					onChange={(val) => handleChange('fontSizeOption', val)}
					title='Размер шрифта'
				/>

				<Select
					title='Цвет текста'
					options={fontColors}
					selected={formState.fontColor}
					onChange={(val) => handleChange('fontColor', val)}
				/>

				<Select
					title='Цвет фона'
					options={backgroundColors}
					selected={formState.backgroundColor}
					onChange={(val) => handleChange('backgroundColor', val)}
				/>

				<Select
					title='Ширина контента'
					options={contentWidthArr}
					selected={formState.contentWidth}
					onChange={(val) => handleChange('contentWidth', val)}
				/>

				<div className={styles.bottomContainer}>
					<Button
						title='Сбросить'
						htmlType='button'
						type='clear'
						onClick={handleReset}
					/>
					<Button title='Применить' htmlType='submit' type='apply' />
				</div>
			</form>
		</aside>
	);
};
