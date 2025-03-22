'use client';
import React, { ReactNode } from 'react';
import { Tabs, Tab, Card, CardBody, Badge } from '@heroui/react';
import DrugImporterRegisterTable from '../../request-approval/_components/DrugImporterRegister';
import PatientRegisterTable from '../../request-approval/_components/PatientRegister';

interface TabProps {
  key: string;
  title: string;
  children: ReactNode;
}

export default function NavigationTabs(): JSX.Element {
  const [selected, setSelected] = React.useState<string>('drugImporter');

  return (
    <div className='flex flex-col'>
      <Tabs
        aria-label='Options'
        selectedKey={selected}
        onSelectionChange={(key: string) => setSelected(key)}
      >
        <Tab key='drugImporter' title='Drug Importer'>
          <DrugImporterRegisterTable />
        </Tab>
        <Tab key='patient' title='Patient'>
          <PatientRegisterTable />
        </Tab>
      </Tabs>
    </div>
  );
}
