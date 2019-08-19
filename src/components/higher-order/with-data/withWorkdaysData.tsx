import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getWorkdaysAction } from '../../../store/actions';
import { State } from '../../../store/states';
import { Workdays } from '../../../types';
import { Loader } from '../../Loader';

interface StateProps {
    isFetching?: boolean;
    workdays?: Workdays;
}

const mapStateToProps = (state: State): StateProps => ({
    isFetching: state.hours.isFetching,
    workdays: state.hours.workdays
});

interface DispatchProps {
    getWorkdays: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getWorkdays: () => getWorkdaysAction()(dispatch)
});

type WithWorkdaysDataProps = StateProps & DispatchProps;

export const withWorkdaysData = (Component: React.ComponentType) => {
    class WithWorkdaysDataComponent extends React.Component<WithWorkdaysDataProps> {
        public componentDidMount() {
            this.fetchDays();
        }

        public shouldComponentUpdate(nextProps: WithWorkdaysDataProps) {
            if (!nextProps.workdays) {
                this.fetchDays(nextProps);
            }

            return true;
        }

        public render() {
            const { isFetching } = this.props;

            return isFetching
                ? <Loader text="Fetching workdays from server..."/>
                : <Component/>;
        }

        private fetchDays = (props = this.props) => {
            const { getWorkdays } = props;

            getWorkdays();
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithWorkdaysDataComponent);
};
