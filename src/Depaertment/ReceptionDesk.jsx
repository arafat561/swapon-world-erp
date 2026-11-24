import React from 'react';
import { StandardDepartmentView } from '../components/TaskTable';

export default function ReceptionDesk(props) {
  return <StandardDepartmentView {...props} areaKey="receptionAreas" />;
}