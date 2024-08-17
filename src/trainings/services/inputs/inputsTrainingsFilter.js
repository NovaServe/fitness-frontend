export const getInputsListTrainingFilter = (areas, instructors) => {
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
        {value: 'In-person', label: 'In-person'},
        {value: 'Virtual', label: 'Virtual'}],
      isMultiple: true,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'pageSize',
      options: [
        { value: '', label: 'Page size' },
        {value: '5', label: '5'},
        {value: '10', label: '10'},
        {value: '15', label: '15'}],
      isMultiple: false,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'sortBy',
      options: [
        { value: '', label: 'Sort by' },
        {value: 'id', label:'id'},
        {value: 'fullName', label: 'fullName'} ],
      isMultiple: false,
      rules: {
        required: false
      }
    },
    {
      type: 'select',
      name: 'order',
      options: [
        { value: '', label: 'Order' },
        {value: 'ASC', label:'Ascending'},
        {value: 'DESC', label: 'Descending'}],
      isMultiple: false,
      rules: {
        required: false
      }
    },
  ];
};