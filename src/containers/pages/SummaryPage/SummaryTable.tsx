import * as classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { InputCellType } from '../../../enums';
import { calculateTotalsPerProject, toHourFormat } from '../../../helpers';
import { State } from '../../../store/states';
import { Project, Projects, Workdays } from '../../../types';

import './SummaryTable.css';

interface StateProps {
    projects: Projects;
    workdays: Workdays;
}

const mapStateToProps = (state: State): StateProps => ({
    projects: state.projects.projects,
    workdays: state.hours.workdays
});

class WeekTableComponent extends React.PureComponent<StateProps> {
    public render() {
        const { projects, workdays } = this.props;

        const totalsPerProject = calculateTotalsPerProject(projects, workdays);

        return (
            <Card className="summary-table" level={3}>
                <div className="line-header">
                    <div className="header-label-fill">Project</div>
                    <div className="header-label">Hours</div>
                    <div className="header-label">SS</div>
                </div>

                {totalsPerProject
                    .filter((totals, projectId) => {
                        const matchingProject = this.getMatchingProject(projectId);

                        return matchingProject && matchingProject.get('show');
                    })
                    .entrySeq()
                    .map(([projectId, totals]) => {
                        const matchingProject = this.getMatchingProject(projectId);

                        if (!matchingProject) {
                            return null;
                        }

                        return (
                            <div className="project" key={projectId}>
                                <div className="project-header">{matchingProject.get('name')}</div>

                                <Input
                                    className="hours"
                                    type={InputCellType.TEXT}
                                    value={toHourFormat(totals.hours)}
                                    disabled={true}
                                />
                                <Input
                                    className={classNames({ ss: true, good: totals.ss > 0, bad: totals.ss < 0 })}
                                    type={InputCellType.TEXT}
                                    value={`${totals.ss > 0 ? '+' : ''}${toHourFormat(totals.ss)}`}
                                    disabled={true}
                                />
                            </div>
                        );
                    })}
            </Card>
        );
    }

    private getMatchingProject = (projectId: string): Project | undefined => {
        const { projects } = this.props;

        return projects.find((project) => project.get('id') === projectId);
    };
}

export const SummaryTable = connect(mapStateToProps)(WeekTableComponent);
