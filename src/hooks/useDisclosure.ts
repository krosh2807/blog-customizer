import { useCallback, useEffect, useState } from 'react';

type UseDisclosureProps = {
	initialState?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
};

export const useDisclosure = ({
	initialState = false,
	onOpen,
	onClose,
}: UseDisclosureProps = {}) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const open = useCallback(() => {
		setIsOpen(true);
		onOpen?.();
	}, [onOpen]);

	const close = useCallback(() => {
		setIsOpen(false);
		onClose?.();
	}, [onClose]);

	const toggle = useCallback(() => {
		setIsOpen(prev => {
			const newState = !prev;
			if (newState) {
				onOpen?.();
			} else {
				onClose?.();
			}
			return newState;
		});
	}, [onOpen, onClose]);

	useEffect(() => {
		setIsOpen(initialState);
	}, [initialState]);

	return {
		isOpen,
		open,
		close,
		toggle,
	};
};
