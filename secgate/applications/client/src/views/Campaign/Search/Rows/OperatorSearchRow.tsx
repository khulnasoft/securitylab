import { highlightPattern } from '@secgate/client/components';
import type { OperatorModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import type { SearchRowProps } from '@secgate/client/views';
import { SearchRow } from '@secgate/client/views';
import type { FC } from 'react';
import type { SearchResultItemProps } from '../SearchResultItem';

type OperatorSearchRowProps = SearchRowProps<OperatorModel> & SearchResultItemProps;

export const OperatorSearchRow: FC<OperatorSearchRowProps> = ({ result, searchTerm, item: operator, ...props }) => {
	const store = useStore();

	const text = highlightPattern(String(result.name), searchTerm);

	// const { field, value = '' } = getMatchValue(result);
	// const subText = field ? `${field}: ${highlightPattern(value, searchTerm)}` : undefined;

	return (
		<SearchRow
			cy-test="search-result-item"
			item={operator}
			text={text}
			// subText={subText}
			path={['Operator']}
			onClick={() => {
				operator.searchSelect();
				store.campaign.search.closeSearch();
			}}
			commandsCount={operator?.logIds?.length}
			commentsCount={operator?.commentsCount}
			beaconsCount={operator.beaconIds?.length || 0}
			{...props}
		/>
	);
};
