import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getProjectsAction } from '../../../store/actions';
import { State } from '../../../store/states';
import { Loader } from '../../Loader';

interface StateProps {
    isFetching?: boolean;
}

const mapStateToProps = (state: State): StateProps => ({
    isFetching: state.projects.isFetching
});

interface DispatchProps {
    getProjects: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getProjects: () => getProjectsAction()(dispatch)
});

type WithProjectsDataProps = StateProps & DispatchProps;

export const withProjectsData = (Component: React.ComponentType) => {
    class WithProjectsDataComponent extends React.Component<WithProjectsDataProps> {
        public componentDidMount() {
            this.fetchProjects();
        }

        public render() {
            const { isFetching } = this.props;

            return isFetching
                ? <Loader text="Fetching projects from server..."/>
                : <Component/>;
        }

        private fetchProjects = (props = this.props) => {
            const { getProjects } = props;

            getProjects();
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(WithProjectsDataComponent);
};
