'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IApplicationForm, IFeedbackForm } from '@/app/types/application';

type FeedbackFormProps = {
  applicationData: IApplicationForm;
  refId: string;
  refType: string;
}

export default function FeedbackForm({ applicationData, refId, refType }: FeedbackFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedbackData, setFeedbackData] = useState<IFeedbackForm>({
    propertyImpression: 'maybe',
    locationSatisfaction: false,
    criteriaMatch: false,
    additionalComments: '',
  });

  const handleChange = (name: keyof IFeedbackForm, value: string | boolean) => {
    setFeedbackData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/forms/${refId}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedbackData, refId, refType }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      router.push('/feedback-success');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">Viewing Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Object.entries(applicationData).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={key} className="text-sm font-medium text-gray-700">{key.replace('_', ' ').charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input type="text" id={key} name={key} value={value?.toString()} disabled className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Did you like the property?</Label>
                <RadioGroup
                  onValueChange={(value) => handleChange('propertyImpression', value)}
                  defaultValue="maybe"
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="property-yes" />
                    <Label htmlFor="property-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="property-maybe" />
                    <Label htmlFor="property-maybe">Maybe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="property-no" />
                    <Label htmlFor="property-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Did you like the location?</Label>
                <Select onValueChange={(value) => handleChange('locationSatisfaction', value === 'yes')}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="criteria" className="text-sm font-medium text-gray-700">Did the property meet your criteria?</Label>
                <Select onValueChange={(value) => handleChange('criteriaMatch', value === 'yes')}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additionalComments" className="text-sm font-medium text-gray-700">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  value={feedbackData.additionalComments}
                  onChange={(e) => handleChange('additionalComments', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Feedback
                </>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

