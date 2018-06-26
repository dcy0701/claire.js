import { Component } from './component'
import { renderComponent } from './vdom';

export function enqueueRender(component: Component) {
	if (!component._dirty && (component._dirty = true) && items.push(component)==1) {
        setTimeout(rerender);
	}
}

let items: Component[] = [];

export function rerender () {
    const list = items;
    items = [];
    for (const currentItem of list) {
        if (currentItem._dirty) {
            renderComponent(currentItem);
        }
    }
}