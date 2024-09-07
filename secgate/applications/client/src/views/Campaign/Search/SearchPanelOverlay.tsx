import type { DialogExProps } from '@secgate/client/components';
import { DialogEx } from '@secgate/client/components';
import { observer } from 'mobx-react-lite';
import { SearchPanel } from './SearchPanel';

export const SearchPanelOverlay = observer<DialogExProps>(({ ...props }) => (
	<DialogEx wide fixedHeight {...props}>
		<SearchPanel />
	</DialogEx>
));
