export const getInputsTrainingsFilter = (areas, instructors) => {
  return [
    {
      type: 'select',
      name: 'areas',
      options: [...[{ value: '', label: 'Areas' }], ...areas],
      isMultiple: true,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'instructors',
      options: [...[{ value: '', label: 'Instructors' }], ...instructors],
      isMultiple: true,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'levels',
      options: [
        { value: '', label: 'Levels' },
        {value: 'Beginner', label: 'Beginner'},
        {value: 'Intermediate', label: 'Intermediate'},
        {value: 'Advanced', label: 'Advanced'}],
      isMultiple: true,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'intensity',
      options: [
        { value: '', label: 'Intensity' },
        {value: 'Low', label: 'Low'},
        {value: 'Moderate', label: 'Moderate'},
        {value: 'High', label: 'High'}],
      isMultiple: true,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'type',
      options: [
        { value: '', label: 'Type' },
        {value: 'In_person', label: 'In-person'},
        {value: 'Virtual', label: 'Virtual'}],
      isMultiple: true,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'kind',
      options: [
        { value: '', label: 'Kind' },
        {value: 'Group', label: 'Group'},
        {value: 'Individual', label: 'Individual'}],
      isMultiple: true,
      rules: {
        required: false
      }
    }
  ];
};