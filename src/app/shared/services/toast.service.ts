import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ToastService {
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		switch (options.type) {
			case 'danger':
				options.classname = 'bg-danger text-light';
				options.delay = 15000;
				break;
			case 'success':
				options.classname = 'bg-success text-light';
				options.delay = 10000;
				break;
		}

		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}