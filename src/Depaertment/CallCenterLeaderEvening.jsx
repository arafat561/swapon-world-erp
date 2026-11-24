import React from 'react';
import { StandardDepartmentView } from '../components/TaskTable';

export default function CallCenterLeaderEvening(props) {
  return <StandardDepartmentView {...props} areaKey="ccLeaderAreas" />;
}