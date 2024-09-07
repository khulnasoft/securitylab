import { createSorter, isDefined, VirtualizedList } from '@secgate/client/components';
import type { HostModel, SortType } from '@secgate/client/store';
import { SortDirection, useStore } from '@secgate/client/store';
import { defaultInfoRowHeight, HostOrServerRow, MessageRow } from '@secgate/client/views';
import { observer } from 'mobx-react-lite';
import type { ComponentProps } from 'react';

type OverviewProps = ComponentProps<'div'> & {
	sort: SortType;
};

export const OverviewHostsList = observer<OverviewProps>(({ sort }) => {
	const store = useStore();
	const hosts = Array.from(store.graphqlStore?.hosts.values() || [])
		?.filter<HostModel>(isDefined)
		.sort((host1, host2) =>
			// put all servers at the top of the list, regardless of sort setting
			host1.cobaltStrikeServer === host2.cobaltStrikeServer
				? createSorter(sort.sortBy, sort.direction === SortDirection.ASC)(host1, host2)
				: host1.cobaltStrikeServer
				? -1
				: 1
		);
	return (
		<VirtualizedList fixedItemHeight={defaultInfoRowHeight} cy-test="hosts-view">
			{hosts.length === 0 ? (
				<MessageRow>No Hosts</MessageRow>
			) : (
				hosts.map((host) => <HostOrServerRow key={host.id} host={host} />)
			)}
		</VirtualizedList>
	);
});
