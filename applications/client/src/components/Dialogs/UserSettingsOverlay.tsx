import { Button } from '@blueprintjs/core';
import type { DialogExProps } from '@secgate/client/components';
import { DialogBodyEx, DialogEx, DialogFooterEx } from '@secgate/client/components';
import { useStore } from '@secgate/client/store';
import { Txt } from '@secgate/ui-styles';
import { observer } from 'mobx-react-lite';
import type { FormEventHandler } from 'react';

type UserSettingsOverlayProps = DialogExProps & {
	onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const UserSettingsOverlay = observer<UserSettingsOverlayProps>(({ onSubmit, onClose, ...props }) => {
	const store = useStore();
	return (
		<DialogEx title="User" onClose={onClose} {...props}>
			<DialogBodyEx>
				<Txt>Logged in as {store.auth.userName}</Txt>
			</DialogBodyEx>
			<DialogFooterEx
				actions={
					<>
						<Button text="Close" onClick={onClose} />
						<Button
							intent="warning"
							text="Log out"
							cy-test="logout"
							onClick={() => store.auth.logOut()}
							css={{ marginLeft: -7 }}
						/>
					</>
				}
			/>
		</DialogEx>
	);
});
