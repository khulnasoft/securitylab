import { highlightPattern } from '@secgate/client/components';
import type { ServerModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import type { SearchRowProps } from '@secgate/client/views';
import { SearchRow } from '@secgate/client/views';
import { observer } from 'mobx-react-lite';
import type { SearchResultItemProps } from '../SearchResultItem';

type ServerSearchRowProps = SearchRowProps<ServerModel> & SearchResultItemProps;

export const ServerSearchRow = observer<ServerSearchRowProps>(({ result, searchTerm, item: server, ...props }) => {
	const store = useStore();

	const text = highlightPattern(
		!server.displayName || server.displayName === server.computedName
			? server.computedName
			: `${server.displayName} (${server.computedName})`,
		searchTerm
	);

	return (
		<SearchRow
			cy-test="search-result-item"
			item={server}
			text={text}
			path={['Server']}
			startTime={server.minTime}
			endTime={server.maxTime}
			hostsCount={server.hosts.size - 1}
			beaconsCount={server.beacons.length - 1}
			commentsCount={server.commentCount}
			onClick={() => {
				server.searchSelect();
				store.campaign.search.closeSearch();
			}}
			{...props}
		/>
	);
});
