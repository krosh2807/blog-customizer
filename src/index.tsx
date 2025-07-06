import { StrictMode, useRef, useEffect, useState, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from './ui/arrow-button';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import { useDisclosure } from './hooks/useDisclosure';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const App = () => {
	const { isOpen, toggle, close } = useDisclosure();
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const [articleStyle, setArticleStyle] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				close();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, close]);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyle.fontFamilyOption.value,
					'--font-size': articleStyle.fontSizeOption.value,
					'--font-color': articleStyle.fontColor.value,
					'--container-width': articleStyle.contentWidth.value,
					'--bg-color': articleStyle.backgroundColor.value,
				} as CSSProperties
			}>
			{/* Кнопка стрелки — всегда отображается */}
			<ArrowButton isOpen={isOpen} onClick={toggle} />

			{/* Панель — всегда в DOM, с классом для анимации */}
			<div
				ref={sidebarRef}
				className={clsx(styles.sidebar, { [styles.sidebar_open]: isOpen })}>
				<ArticleParamsForm
					isOpen={isOpen}
					onToggle={toggle}
					articleStyle={articleStyle}
					setArticleStyle={setArticleStyle}
				/>
			</div>

			<Article />
		</main>
	);
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
