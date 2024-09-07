import { CarbonIcon, semanticIcons } from '@secgate/client/components';
import type { CommandModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import type { CommentPopoverProps } from '@secgate/client/views';
import { CommentList, CommentPopover } from '@secgate/client/views';
import { UtilityStyles, HeroButton } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import type { ComponentProps } from 'react';
import { useCallback, useEffect, useRef } from 'react';

type CommentCountProps = CommentPopoverProps & {
	command?: CommandModel;
	commandGroupId?: string | null;
	annotationId?: string | null;
};

export const CommentCount = observer<CommentCountProps>(
	({ annotationId, commandGroupId, command, children, ...props }) => {
		const store = useStore();
		const commentCount = command?.commandGroups?.length || 0;
		const hasComments = commentCount > 0;

		const isOpen =
			store.campaign?.commentStore.commentsOpen === command?.id &&
			(!commandGroupId ? true : store.campaign?.commentStore.commentGroupOpen === commandGroupId) &&
			(!annotationId ? true : store.campaign?.commentStore.annotationOpen === annotationId);

		const closeComments = useCallback(() => {
			store.campaign?.commentStore.setCommentsOpen('');
		}, [store.campaign?.commentStore]);

		const handleClick = useCallback(() => {
			if (isOpen) {
				closeComments();
			} else {
				if (command) store.campaign?.commentStore?.setCommentsOpen(command.id);
				if (commandGroupId) store.campaign?.commentStore?.setCommentGroupOpen(commandGroupId);
				if (annotationId) store.campaign?.commentStore?.setAnnotationOpen(annotationId);
			}
		}, [command, commandGroupId, annotationId, closeComments, isOpen]);

		useEffect(
			() => () => {
				// only fires on "unmount"
				// this will close the CommentPopover when it scrolls out of view in a VirtualizedList
				if (isOpen) closeComments();
			},
			[closeComments, isOpen]
		);
		const container = useRef<HTMLDivElement>(null);

		return store.appMeta.blueTeam && !hasComments ? null : (
			<CommentPopover
				isOpen={isOpen}
				popoverRef={container}
				content={<CommentList popoverRef={container} command={command} onClose={closeComments} />}
				onInteraction={(nextOpenState) => {
					if (!nextOpenState) closeComments();
				}}
				renderTarget={({ onClick, className, ...targetProps }) => (
					<HeroButton
						children={
							<CarbonIcon cy-test="add-comment" icon={hasComments ? semanticIcons.comment : semanticIcons.addComment} />
						}
						onClick={handleClick}
						hover={isOpen}
						className={[className, !hasComments && !isOpen ? UtilityStyles.hoverRevealClassName : undefined].join(' ')}
						{...(targetProps as ComponentProps<'button'>)}
					/>
				)}
				{...props}
			/>
		);
	}
);
