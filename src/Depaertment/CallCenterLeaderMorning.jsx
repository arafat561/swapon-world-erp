import React from 'react';
import { StandardDepartmentView } from '../components/TaskTable';

export default function CallCenterLeaderMorning(props) {
  return <StandardDepartmentView {...props} areaKey="ccLeaderAreas" />;
}