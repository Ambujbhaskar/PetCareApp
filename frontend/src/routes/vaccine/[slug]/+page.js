import { error } from '@sveltejs/kit';
import appointments from "$lib/data/appointments.json";
import { vaccineComparator } from '../../common/util';
 
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    appointments.sort(vaccineComparator);
    for (let i in appointments) {
        if (params.slug == appointments[i].id)
            return appointments[i];
    }
    throw error(404, 'Not found');
}