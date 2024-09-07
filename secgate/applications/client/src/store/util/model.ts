import { getRootStore, model, Model } from 'mobx-keystone';
import type { AppStore } from '../app-store';

@model('SecGateModel')
export class SecGateModel extends Model({}) {
	protected onInit() {
		super.onInit?.();
	}

	get appStore(): AppStore | undefined {
		return getRootStore<AppStore>(this);
	}
}
