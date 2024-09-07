import type { TxtProps } from '@secgate/ui-styles';
import { Txt } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import type { BeaconModel } from '@secgate/client/store';
import { highlightPattern } from '@secgate/client/components';

export type BeaconSuggestedRowProps = TxtProps & {
	beaconModel: BeaconModel;
	query?: string;
};

export const BeaconSuggestedRow = observer<BeaconSuggestedRowProps>(({ beaconModel, query, ...props }) => (
	<Txt {...props}>{highlightPattern(beaconModel.computedNameWithHost, query)}</Txt>
));
