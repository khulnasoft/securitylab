import { VirtualizedList } from '@secgate/client/components';
import type { BeaconModel } from '@secgate/client/store';
import { BeaconRow, defaultInfoRowHeight, MessageRow } from '@secgate/client/views';
import type { Ref } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import type { BeaconsListRow } from '../hooks/use-beacons';
import { useBeacons } from '../hooks/use-beacons';

export const BeaconsList = observer<BeaconsListRow>(({ ...props }) => {
	const { beacons } = useBeacons(props);

	return (
		<VirtualizedList fixedItemHeight={defaultInfoRowHeight}>
			{beacons.length === 0 ? (
				<MessageRow>No Beacons</MessageRow>
			) : (
				beacons.map((beacon: BeaconModel | Ref<BeaconModel>) => (
					<BeaconRow key={beacon.id} beacon={'current' in beacon ? beacon?.current : beacon} />
				))
			)}
		</VirtualizedList>
	);
});
