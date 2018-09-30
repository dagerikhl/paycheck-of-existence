export interface SimpleAction {
    type: string;
    payload: string;
}

export type DummyAction =
    | SimpleAction;

export const simpleAction = (payload: string): SimpleAction => ({
    type: 'SIMPLE_ACTION',
    payload
});
