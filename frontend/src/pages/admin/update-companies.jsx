import Layout from '@/components/layout';
import { Topbar } from '@/components/topbar';
import { Button } from '@/components/ui/button';
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
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
const UpdateCompanies= () => {
  const [view, setView] = useState('row')
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
  const onSubmit = () => {

  }
  return (
    <Layout>
      <Topbar title="Google Company" mode="create" />
      <div className='w-[80%] m-auto py-4'>
        <Form {...companiesForm}>
          <form onSubmit={companiesForm.handleSubmit(onSubmit)} className='grid space-y-6'>

            <Button type="submit" className={"ml-auto"}>Save</Button>
            <div className='grid grid-cols-2 gap-2'>
              <FormField
                control={companiesForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is Company&apos;s name
                    </FormDescription>
                    <FormMessage />
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
                    <FormDescription>
                      This is Company&apos;s Email
                    </FormDescription>
                    <FormMessage />
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
                    <FormDescription>
                      This is Company&apos;s Mission
                    </FormDescription>
                    <FormMessage />
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
                    <FormDescription>
                      This is Company&apos;s Industry</FormDescription>
                    <FormMessage />
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
                    <FormDescription>
                      This is Company&apos;s Website URL
                    </FormDescription>
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={companiesForm.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxxxx-xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
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
