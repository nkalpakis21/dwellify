'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { IApplicationForm, transformApplicationToForm } from '@/app/types/application';
import FeedbackForm from '@/components/feedback/from';

export default function FeedbackPage() {
  const params = useParams();
  const { refType, refId } = params;
  const [applicationData, setApplicationData] = useState<IApplicationForm | null>(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      try {
        const response = await fetch(`/api/forms/${refId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch application data');
        }
        const data = await response.json();
        const applicationForm = transformApplicationToForm(data.application);
        setApplicationData(applicationForm);
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };

    fetchApplicationData();
  }, [refId]);

  if (!applicationData) {
    return <div>Loading...</div>;
  }

  return <FeedbackForm applicationData={applicationData} refId={refId as string} refType={refType as string} />;
}

