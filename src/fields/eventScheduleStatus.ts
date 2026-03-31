import type { Field } from 'payload'

/**
 * Event/session status shared with the Services collection (`interfaceName` keeps the `ServiceStatus` type).
 */
export const eventScheduleStatusField: Field = {
  name: 'status',
  interfaceName: 'serviceStatus',
  type: 'select',
  label: 'Stav',
  defaultValue: 'scheduled',
  options: [
    { label: 'Naplánováno', value: 'scheduled' },
    { label: 'Probíhá', value: 'inProgress' },
    { label: 'Obsazeno', value: 'booked' },
    { label: 'Zrušeno', value: 'cancelled' },
  ],
}
