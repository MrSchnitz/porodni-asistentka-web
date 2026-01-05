import { Field } from 'payload'

export const serviceStatus: Field = {
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
