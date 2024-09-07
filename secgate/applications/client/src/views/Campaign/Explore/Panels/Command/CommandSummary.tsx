import { Button, Checkbox } from '@blueprintjs/core';
import { ChevronDown16, ChevronRight16 } from '@carbon/icons-react';
import { css } from '@emotion/react';
import { CarbonIcon, dateShortFormat, timeFormat } from '@secgate/client/components';
import type { AppStore, CommandModel } from '@secgate/client/store';
import { NavBreadcrumbs } from '@secgate/client/views';
import { Spacer, Txt } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import type { ComponentProps } from 'react';

export type CommandSummaryProps = ComponentProps<'div'> & {
	store: AppStore;
	commandId?: string | undefined;
	skeletonClass?: string;
	collapsed?: boolean;
	showPath?: 'server' | 'host' | 'beacon' | boolean;
	command?: CommandModel;
};

export const CommandSummary = observer<CommandSummaryProps>(
	({ store, skeletonClass, commandId, collapsed: isCollapsed = true, showPath = false, command }) => (
		<>
			<Button
				// no-op Button, for UX only
				className={skeletonClass}
				icon={<CarbonIcon cy-test="expand" icon={isCollapsed ? ChevronRight16 : ChevronDown16} />}
				minimal
				small
			/>
			{store.campaign?.commentStore.groupSelect && (
				<Checkbox
					cy-test="checkbox-select-command"
					checked={commandId ? store.campaign?.commentStore.selectedCommands?.has(commandId) : false}
					onClick={(e) =>
						// @ts-ignore
						e.target.checked && commandId
							? store.campaign?.commentStore.addSelectedCommand(commandId)
							: store.campaign?.commentStore.removeSelectedCommand(commandId!)
					}
					css={css`
						margin-bottom: 0;
					`}
				/>
			)}
			<div className={skeletonClass} css={rowTextStyle}>
				<Txt cy-test="command-header" ellipsize small muted block title={command?.info.contextTooltipText}>
					<Txt cy-test="command-date-time" monospace>
						{command?.info.time.format(`${dateShortFormat} ${timeFormat}`)}
					</Txt>
					<Spacer />
					<Txt cy-test="command-operator">{command?.info.operator}</Txt>
					{isCollapsed && showPath && (
						<>
							<Spacer>{' • '}</Spacer>
							<Txt>
								{[
									showPath === 'server' && command?.info.server,
									(showPath === 'server' || showPath === 'host') && command?.info.host,
									command?.info.beacon,
								]
									.filter((_) => _)
									.join(' / ')}
							</Txt>
						</>
					)}
				</Txt>
				{!isCollapsed && showPath && <NavBreadcrumbs cy-test="hostBeaconInfo" command={command} hideRoot muted />}
				<Txt cy-test="command-info" title={command?.info.commandTooltip} block ellipsize>
					<Txt emphasis bold cy-test="command-type">
						{command?.info.commandType}
					</Txt>{' '}
					<Txt cy-test="command-params">{command?.info.commandInput}</Txt>
				</Txt>
			</div>
		</>
	)
);

const rowTextStyle = css`
	flex: 1 1 auto;
	overflow: hidden;
	margin-right: 2rem !important;
	display: flex;
	flex-direction: column;
`;
