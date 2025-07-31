import Layout from '@/components/layout';
import { Topbar } from '@/components/topbar';
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateCompaniesForm } from '@/lib/validations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
const UpdateCompanies= () => {
  // const [view, setView] = useState('row')
  const companiesForm = useForm({
    resolver: yupResolver(validateCompaniesForm),
    defaultValues: {
      name: '', email: '', mission: '',
      industry: '',
      website: '',
      city: '',
      street: '',
      zipcode: ''
    }
  })
  const onSubmit = (values) => {
   console.log('v',values)
  }
  return (
    <Layout>
      <Topbar title={"Google"} mode="create" />
      <div className='w-[80%] m-auto py-4'>
        <Form {...companiesForm}>
          <form onSubmit={companiesForm.handleSubmit(onSubmit)} className='grid space-y-8'>
            <Button type="submit" className={"ml-auto"}>Save</Button>
            <div className='grid grid-cols-2 gap-2'>
              <FormField
                control={companiesForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={'relative'}>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={companiesForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Email" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
            </div>
            <div>
              <FormField
                control={companiesForm.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Mission</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Company Mission" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>


            </div>
            <div>
              <FormField
                control={companiesForm.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Industry</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Theme" {...field}/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light" >Light</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
            </div>
            <div>
              <FormField
                control={companiesForm.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.example.com" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <FormField
                control={companiesForm.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose City</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Theme" {...field}/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light" >Light</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={companiesForm.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="xxx street" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={companiesForm.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxxxx-xxxx" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormDescription>
                This is Company&apos;s Location</FormDescription>

            </div>
          </form>
        </Form>
      </div>
    </Layout >
  )
}
export default UpdateCompanies;
