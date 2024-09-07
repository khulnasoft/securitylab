import { highlightPattern } from '@secgate/client/components';
import { useStore, type PresentationItemModel } from '@secgate/client/store';
import type { SearchRowProps } from '@secgate/client/views';
import { SearchRow } from '@secgate/client/views';
import { observer } from 'mobx-react-lite';
import type { SearchResultItemProps } from '../SearchResultItem';

type TagSearchRowSearchRowProps = SearchRowProps<PresentationItemModel> & SearchResultItemProps;

export const UserSearchRow = observer<TagSearchRowSearchRowProps>(({ result, searchTerm, item: user, ...props }) => {
	const store = useStore();

	const text = highlightPattern(`${user.id.slice(5)}`, searchTerm);

	return (
		<SearchRow
			cy-test="search-result-item"
			item={user}
			text={text}
			path={['User']}
			commandsCount={user.commandCount}
			commentsCount={user.count}
			onClick={() => {
				user.searchSelect();
				store.campaign.search.closeSearch();
			}}
			{...props}
		/>
	);
});
