import { Alignment, Button, ButtonGroup, Divider, Intent } from '@blueprintjs/core';
import { css } from '@emotion/react';
import {
	CarbonIcon,
	customIconPaths,
	ScrollBox,
	ScrollChild,
	semanticIcons,
	updatePopper,
} from '@secgate/client/components';
import { createState } from '@secgate/client/components/mobx-create-state';
import type { CommandModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import { CommentBox, commentPopoverPadding } from '@secgate/client/views';
import { CoreTokens } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import type { ComponentProps, RefObject } from 'react';
import { useEffect } from 'react';

type CommentListProps = ComponentProps<'div'> & {
	command?: CommandModel;
	popoverRef?: RefObject<HTMLElement>;
	onClose: () => unknown;
};

export const CommentList = observer<CommentListProps>(({ command, onClose, popoverRef, ...props }) => {
	const store = useStore();
	const state = createState({
		showCommandGroups: false,
		isAddingNewComment: store.campaign?.commentStore.newGroupComment || command?.commandGroups?.length === 0,
		toggleNewComment() {
			this.isAddingNewComment = !this.isAddingNewComment;
		},
	});

	useEffect(() => {
		document.dispatchEvent(updatePopper);
	});

	return (
		<div
			cy-test="comment-dialog"
			{...props}
			css={css`
				width: 20rem;
				/* height: 100%; */
				display: flex;
				flex-direction: column;
				max-height: calc(100vh - ${commentPopoverPadding.top + commentPopoverPadding.bottom + 20}px);
			`}
		>
			<ScrollBox
				css={css`
					&:before {
						content: none;
					}
				`}
			>
				<ScrollChild>
					{/* TODO: no comments message when array is empty? */}
					{command?.commandGroups?.flatMap((commandGroup) =>
						commandGroup?.maybeCurrent?.annotations?.map((annotation) => (
							<CommentBox
								cy-test="existing-comment-display"
								key={`${annotation.id}`}
								popoverRef={popoverRef}
								commandId={command?.id}
								commandText={command?.inputText}
								annotation={annotation.maybeCurrent}
								commandGroup={commandGroup.maybeCurrent}
								css={css`
									&:not(:last-child) {
										border-bottom: 1px solid ${CoreTokens.BorderMuted};
									}
								`}
							/>
						))
					) ?? (
						<div
							css={css`
								height: 100vh;
							`}
						/>
					)}
				</ScrollChild>
			</ScrollBox>
			{state.isAddingNewComment && (
				<CommentBox
					cy-test="comment-box"
					popoverRef={popoverRef}
					newComment={!!state.isAddingNewComment}
					commandId={command?.id}
					commandText={command?.inputText}
					cancel={state.toggleNewComment}
					css={css`
						border-top: 1px solid ${CoreTokens.BorderNormal};
					`}
				/>
			)}
			{!store.appMeta.blueTeam && (
				<ButtonGroup
					vertical
					fill
					css={css`
						border-top: 1px solid ${CoreTokens.BorderNormal};
					`}
				>
					{!state.isAddingNewComment && (
						<>
							<Button
								cy-test="add-new-comment"
								text={['New comment']}
								icon={<CarbonIcon icon={semanticIcons.addComment} />}
								intent={Intent.PRIMARY}
								alignText={Alignment.LEFT}
								minimal
								onClick={state.toggleNewComment}
							/>
							<Divider
								css={css`
									margin: 0;
								`}
							/>
						</>
					)}
					<Button
						cy-test="add-command-existing-comment"
						text="Add command to existing comment"
						onClick={() => {
							onClose();
							if (command) {
								store.campaign.addCommandToCommandGroup.openAddToCommandGroupDialog(command?.id);
							}
						}}
						icon={<CarbonIcon icon={customIconPaths.multiComment16} />}
						alignText={Alignment.LEFT}
						intent={Intent.PRIMARY}
						minimal
						disabled={store.graphqlStore.commandGroups.size === 0}
					/>
				</ButtonGroup>
			)}
		</div>
	);
});
