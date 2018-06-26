import { enqueueRender } from './render-queue';

export interface Component<P = {}, S = {}, SS = any> { }
export class Component<P, S> {
    props: Readonly<P>;
    context?: any;
    state: Readonly<S>;
    private renderCallbacks: Array<() => void> = [];
    _dirty: boolean = false

    constructor(props: P, context?: any) {
        this.props = props;
        this.context = context;
        this.state = <S>{};
    }

    setState(partialState: Partial<S>, callback?: ()=> void) {
        // 立即改变state
        Object.assign(this.state, partialState);
        callback && this.renderCallbacks.push(callback);
        // 排队渲染
        enqueueRender(this)
    }
}
