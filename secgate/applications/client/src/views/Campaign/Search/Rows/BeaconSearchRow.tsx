import { highlightPattern } from '@secgate/client/components';
import type { BeaconModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import type { SearchRowProps } from '@secgate/client/views';
import { getPaths, SearchRow } from '@secgate/client/views';
import { observer } from 'mobx-react-lite';
import type { SearchResultItemProps } from '../SearchResultItem';

type BeaconSearchRowProps = SearchRowProps<BeaconModel> & SearchResultItemProps;

export const BeaconSearchRow = observer<BeaconSearchRowProps>(({ result, searchTerm, item: beacon, ...props }) => {
	const store = useStore();

	const text = highlightPattern(
		!beacon.displayName || beacon.displayName === beacon.computedName
			? beacon.computedName
			: `${beacon.displayName} (${beacon.computedName})`,
		searchTerm
	);

	const beaconUser = highlightPattern(beacon.meta?.[0]?.maybeCurrent?.username || undefined, searchTerm);

	return (
		<SearchRow
			cy-test="search-result-item"
			item={beacon}
			text={text}
			subText={beaconUser}
			path={getPaths(store, beacon.hierarchy).slice(0, -1).concat(['Beacon']) as string[]}
			startTime={beacon.minTime}
			endTime={beacon.maxTime}
			commandsCount={beacon.commandsCount ?? 0}
			commentsCount={beacon.commentsCount ?? 0}
			onClick={() => {
				beacon.searchSelect();
				store.campaign.search.closeSearch();
			}}
			{...props}
		/>
	);
});
