import { css } from '@emotion/react';
import type { CarbonIconProps } from '@secgate/client/components';
import { CarbonIcon } from '@secgate/client/components';
import { CoreTokens, Txt } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import type { ComponentProps, ReactNode } from 'react';

type TextLabelProps = ComponentProps<'span'> & {
	value?: ReactNode;
	icon: CarbonIconProps['icon'];
};
export const IconLabel = observer<TextLabelProps>(({ value, icon, title, ...props }) => (
	<Txt small title={`${value?.toString()} ${title}`} css={{ marginRight: '0.5rem' }} {...props}>
		<Txt>{value}</Txt>
		<CarbonIcon
			icon={icon}
			css={css`
				color: ${CoreTokens.TextDisabled} !important;
				margin-left: 2px;
			`}
		/>
	</Txt>
));
