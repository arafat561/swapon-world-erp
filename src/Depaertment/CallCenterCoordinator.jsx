import React from 'react';
import { StandardDepartmentView } from '../components/TaskTable';

export default function CallCenterCoordinator(props) {
  return <StandardDepartmentView {...props} areaKey="ccAreas" />;
}