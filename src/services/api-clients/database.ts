import { DATE_FORMATS } from '../../constants';
import { parseWorkdaysDb } from '../../helpers/data-helper';
import { Period, WorkdayJs, Workdays, WorkdaysDb } from '../../types';
import { firebaseDatabase } from '../firebase';

const databaseRef = firebaseDatabase.ref();

const getUserRef = (userId: string) => databaseRef.child('user-data').child(userId);

const stripFieldsForStorage = (data: object, keysToRemove: string[]) => {
    for (const key of keysToRemove) {
        delete data[key];
    }

    return data;
};

// TODO Implement API for projects
const projectsApi = (userId: string) => ({});

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
    update: (workdays: Workdays) => Promise.all(
        workdays.map((workday) => {
            const projectId = workday.get('projectId');
            const dateString = workday.get('date').format(DATE_FORMATS.storage);

            const workdayJs = stripFieldsForStorage(workday.toJS(), ['date', 'projectId']);

            return getUserRef(userId).child('workdays').child(projectId).child(dateString).update(workdayJs);
        }))
});

export const database = (userId: string) => ({
    projects: projectsApi(userId),
    workdays: workdaysApi(userId)
});
