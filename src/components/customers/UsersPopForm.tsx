import React, { useEffect, useState } from 'react'
import PopupForm from '../ui/custom/PopupForm'
import { DataTable } from '../dashboard/DataTable'
import { Button } from '../ui/button';

export default function UsersPopForm({userList}) {
    
    const [isOpen, setIsOpen] = useState(false)

    const usersColumn = [
      { key: "name", label: "اسم المستخدم", sortable: true },
      { key: "uptime", label: "وقت الاتصال", sortable: true },
      { key: "address", label: "IP", sortable: true },
    ];

    return (
        <PopupForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trigger={
                <Button
                    variant='destructive'
                    className=''
                >
                    عرض المستخدمين الغير موجودين
                </Button>
            }
        >
            <div>
                <DataTable
                    title='يوزرات فعالة و غير مجودة في البرنامج'
                    data={userList}
                    columns={usersColumn}
                    pageSizeOptions={[5, 10]}
                    defaultPageSize={5}
                />
            </div>
        </PopupForm>
    )
}
