import type { ButtonProps } from '@blueprintjs/core';
import { Button, MenuItem } from '@blueprintjs/core';
import type { ItemRenderer, SelectProps } from '@blueprintjs/select';
import { Select } from '@blueprintjs/select';
import { CaretDown16 } from '@carbon/icons-react';
import { CarbonIcon } from '@secgate/client/components';
import type { NodeIconProps } from '@secgate/client/views/Campaign/Graph';
import type { NodeShape } from '@secgate/graph';
import { nodeShapes } from '@secgate/graph';
import { largePopoverClassName } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import { NodePreview } from './NodePreview';

type NodeShapeSelectProps = Partial<SelectProps<NodeShape>> & {
	onItemSelect: SelectProps<NodeShape>['onItemSelect'];
	buttonProps?: ButtonProps;
	nodeIconProps?: NodeIconProps;
};

export const NodeShapeSelect = observer<NodeShapeSelectProps>(
	({ buttonProps, nodeIconProps, popoverContentProps, ...props }) => {
		const itemRenderer: ItemRenderer<NodeShape> = (shape, { handleClick, handleFocus, modifiers }) => (
			<MenuItem
				active={modifiers.active}
				disabled={modifiers.disabled}
				key={shape}
				onClick={handleClick}
				onFocus={handleFocus}
				text={<NodePreview color="default" shape={shape} text="shape" {...nodeIconProps} />}
			/>
		);

		return (
			<Select
				items={graphShapeOptions}
				itemRenderer={itemRenderer}
				filterable={false}
				fill
				popoverContentProps={{
					className: largePopoverClassName,
					...popoverContentProps,
				}}
				{...props}
			>
				<Button text="Shape" alignText="left" rightIcon={<CarbonIcon icon={CaretDown16} />} fill {...buttonProps} />
			</Select>
		);
	}
);

const graphShapeOptions = nodeShapes;
