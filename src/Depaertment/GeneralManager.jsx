import React from 'react';
import { StandardDepartmentView } from '../components/TaskTable';

export default function GeneralManager(props) {
  return <StandardDepartmentView {...props} areaKey="gmAreas" />;
}