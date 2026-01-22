import React from 'react'
import { useParams } from 'react-router';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function ViewBillsDetails() {
    const id = useParams().id;
  return (
    <DashboardLayout>
      <div>ViewBillsDetails</div>
    </DashboardLayout>
  )
}
