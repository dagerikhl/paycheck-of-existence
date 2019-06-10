import { DATE_FORMATS } from '../../constants';
import { parseProjectDb, parseProjectsDb, parseWorkdaysDb } from '../../helpers/data-helper';
import { Period, Project, ProjectDb, Projects, ProjectsDb, WorkdayJs, Workdays, WorkdaysDb } from '../../types';
import { firebaseDatabase } from '../firebase';

const databaseRef = firebaseDatabase.ref();

const getUserRef = (userId: string) => databaseRef.child('user-data').child(userId);

const stripFieldsForStorage = (data: object, keysToRemove: string[]) => {
    for (const key of keysToRemove) {
        delete data[key];
    }

    return data;
};

const projectsApi = (userId: string) => ({
    get: (id: string): Promise<Project> => {
        return getUserRef(userId).child('projects').child(id).once('value')
            .then((snapshot) => {
                const projectDb: ProjectDb = snapshot && snapshot.val();

                return parseProjectDb(id, projectDb);
            });
    },
    getAll: (): Promise<Projects> => {
        return getUserRef(userId).child('projects').once('value')
            .then((snapshot) => {
                const projectsDb: ProjectsDb = snapshot && snapshot.val();

                return parseProjectsDb(projectsDb);
            });
    },
    update: (project: Project): Promise<any> => {
        const id = project.get('id');

        const projectDb = stripFieldsForStorage(project.toJS(), ['id']);

        return getUserRef(userId).child('projects').child(id).update(projectDb);
    },
    delete: (id: string): Promise<any> => {
        return getUserRef(userId).child('projects').child(id).remove();
    }
});

const workdaysApi = (userId: string) => ({
    getAll: (): Promise<Workdays> => {
        return getUserRef(userId).child('workdays').once('value')
            .then((snapshot) => {
                const workdaysDb: WorkdaysDb = snapshot && snapshot.val();

                return parseWorkdaysDb(workdaysDb);
            });
    },
    getInPeriod: (period: Period): Promise<Workdays> => {
        return getUserRef(userId).child('workdays').once('value')
            .then((snapshot) => {
                const workdaysDb: WorkdaysDb = snapshot && snapshot.val();

                const dateFilter = (workdayJs: WorkdayJs) => {
                    return workdayJs.date.isBetween(period.from, period.to, 'date', '[]');
                };

                return parseWorkdaysDb(workdaysDb, dateFilter);
            });
    },
    updateGroup: (workdays: Workdays) => Promise.all(
        workdays.map((workday) => {
            const projectId = workday.get('projectId');
            const dateString = workday.get('date').format(DATE_FORMATS.storage);

            const workdayDb = stripFieldsForStorage(workday.toJS(), ['date', 'projectId']);

            return getUserRef(userId).child('workdays').child(projectId).child(dateString).update(workdayDb);
        })
    )
});

export const database = (userId: string) => ({
    projects: projectsApi(userId),
    workdays: workdaysApi(userId)
});
