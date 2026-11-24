import React from 'react';
import { StandardDepartmentView } from '../components/TaskTable';

export default function HeadOfOperation(props) {
  return <StandardDepartmentView {...props} areaKey="salesAreas" />;
}