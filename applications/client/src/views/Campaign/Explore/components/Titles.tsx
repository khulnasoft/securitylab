import type { FC } from 'react';
import { css } from '@emotion/react';
import type { HeaderProps } from '@secgate/ui-styles';
import { UtilityStyles, Header } from '@secgate/ui-styles';
import type { NodeIconProps } from '../../Graph';
import { NodeIcon } from '../../Graph';

type PanelHeaderProps = HeaderProps & { nodeIconProps?: NodeIconProps };

export const PanelHeader: FC<PanelHeaderProps> = ({ nodeIconProps, children, ...props }) => (
	<Header h={2} cy-test="panel-header" css={panelHeaderStyle} {...props}>
		{nodeIconProps && <NodeIcon css={{ marginRight: '0!important' }} {...nodeIconProps} />}
		{children}
	</Header>
);

const panelHeaderStyle = css`
	display: flex;
	gap: 0.5ch;
	align-items: center;
	${UtilityStyles.textEllipsis}
`;
