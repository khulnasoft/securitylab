import { highlightPattern } from '@secgate/client/components';
import type { CommandTypeCountModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import type { SearchRowProps } from '@secgate/client/views';
import { SearchRow } from '@secgate/client/views';
import { observer } from 'mobx-react-lite';
import type { SearchResultItemProps } from '../SearchResultItem';

type CommandTypeSearchRowProps = SearchRowProps<CommandTypeCountModel> & SearchResultItemProps;

export const CommandTypeSearchRow = observer<CommandTypeSearchRowProps>(
	({ result, searchTerm, item: commandType, ...props }) => {
		const store = useStore();
		const text = highlightPattern(commandType.text, searchTerm);

		return (
			<SearchRow
				cy-test="search-result-item"
				item={commandType}
				text={text}
				path={['Command Type']}
				commandsCount={commandType.count}
				beaconsCount={commandType.beaconsCount}
				commentsCount={commandType.commentsCount}
				onClick={() => {
					commandType.searchSelect();
					store.campaign.search.closeSearch();
				}}
				{...props}
			/>
		);
	}
);
