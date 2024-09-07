import { highlightPattern } from '@secgate/client/components';
import type { CommandModel } from '@secgate/client/store';
import { useStore } from '@secgate/client/store';
import type { SearchRowProps } from '@secgate/client/views';
import { getPaths, SearchRow } from '@secgate/client/views';
import { Txt } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import type { SearchResultItemProps } from '../SearchResultItem';

type CommandSearchRowProps = SearchRowProps<CommandModel> & SearchResultItemProps;

export const CommandSearchRow = observer<CommandSearchRowProps>(({ result, searchTerm, item: command, ...props }) => {
	const store = useStore();

	const text = highlightPattern(command.inputText, searchTerm);

	const inputLineText = highlightPattern(command.inputLine, searchTerm);

	const allContext = command.outputLines?.reduce((acc, curr) => {
		if (
			acc.length < 6 &&
			searchTerm
				.toLowerCase()
				.split(' ')
				.some((substring) => curr.toLowerCase().includes(substring))
		) {
			return [...acc, curr];
		}
		return acc;
	}, [] as string[]);

	const context = allContext.map((line: string, index) => (
		// eslint-disable-next-line react/no-array-index-key
		<div key={index}>{highlightPattern(line, searchTerm)}</div>
	));

	return (
		<SearchRow
			cy-test="search-result-item"
			item={command}
			text={text}
			subText={inputLineText}
			path={getPaths(store, command.beacon.current.hierarchy).concat(['Command']) as string[]}
			startTime={command.info.time.format()}
			commentsCount={command.commentsCount ?? 0}
			onClick={() => {
				command.searchSelect();
				store.campaign.search.closeSearch();
			}}
			children={
				<Txt cy-test="search-item-details" monospace muted small>
					{context}
				</Txt>
			}
			{...props}
		/>
	);
});
