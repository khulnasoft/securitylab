import type { DialogExProps } from '@secgate/client/components';
import { DialogEx, SettingsForm } from '@secgate/client/components';
import type { FC } from 'react';

type GeneralSettingsOverlayProps = DialogExProps & {};

export const GeneralSettingsOverlay: FC<GeneralSettingsOverlayProps> = ({ ...props }) => (
	<DialogEx title="General Settings" {...props}>
		<SettingsForm css={{ padding: '1rem' }} />
	</DialogEx>
);
