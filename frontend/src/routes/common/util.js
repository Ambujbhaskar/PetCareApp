export function getAppointmentStatus(appointment ,appointments) {
    const thisDate = new Date();
    appointments.sort(vaccineComparator);
    // console.log("apts:",appointments);
    const reducer = (accumulator, current, ind) => {
        let curDate = new Date(current.dateTime);
        if (accumulator < -1)
            return accumulator;
        if (curDate < thisDate)
            accumulator = ind;
        if (current.dateTime == appointment.dateTime) {
            if (ind - accumulator == 1) {
                // next appointment
                accumulator = -2;
            } else if (ind - accumulator > 1) {
                // upcoming appointment
                accumulator = -3;
            } else {
                // past appointments
                if (appointment.completed) {
                    // past completed
                    accumulator = -4;
                } else {
                    // past missed
                    accumulator = -5;
                }
            }
        }
        return accumulator;
    }
    switch (appointments.reduce(reducer, -1)) {
        case -2:
            return "Next";
        case -3:
            return "Upcoming";
        case -4:
            return "Completed";
        case -5:
            return "Missed";
        default:
            console.error("Array does not contain given appointment");
            break;
    }
}

export const vaccineComparator = (apt1, apt2) => {
    const date1 = new Date(apt1.dateTime);
    const date2 = new Date(apt2.dateTime);
    if (date1 > date2) {
        return 1;
    } else if (date2 > date1) {
        return -1;
    } else {
        return 0;
    }
};