import { highlightPattern } from '@secgate/client/components';
import type { HostModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import type { SearchRowProps } from '@secgate/client/views';
import { getPaths, SearchRow } from '@secgate/client/views';
import { observer } from 'mobx-react-lite';
import type { SearchResultItemProps } from '../SearchResultItem';

type HostSearchRowProps = SearchRowProps<HostModel> & SearchResultItemProps;

export const HostSearchRow = observer<HostSearchRowProps>(({ result, searchTerm, item: host, ...props }) => {
	const store = useStore();

	const text = highlightPattern(
		!host.displayName || host.displayName === host.computedName
			? host.computedName
			: `${host.displayName} (${host.computedName})`,
		searchTerm
	);

	return (
		<SearchRow
			cy-test="search-result-item"
			text={text}
			item={host}
			path={getPaths(store, host.hierarchy).slice(0, -1).concat(['Host']) as string[]}
			startTime={host.minTime}
			endTime={host.maxTime}
			beaconsCount={host.beaconCount}
			commentsCount={host.commentCount ?? 0}
			onClick={() => {
				host.searchSelect();
				store.campaign.search.closeSearch();
			}}
			{...props}
		/>
	);
});
