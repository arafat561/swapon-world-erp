import React from 'react';
import { StandardDepartmentView } from '../components/TaskTable';

export default function SeniorAccounts(props) {
  return <StandardDepartmentView {...props} areaKey="accountsAreas" isAccounts={true} />;
}