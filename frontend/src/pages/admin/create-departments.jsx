import React from 'react'
import { useState ,useEffect} from "react";
import Layout from '@/components/layout';
import { Topbar } from '@/components/topbar';
import { FormField, FormDescription, FormControl, FormLabel, FormItem, FormMessage, Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { yupResolver } from '@hookform/resolvers/yup'
import { validateDepartmentForm } from '@/lib/validations';
import { Button } from '@/components/ui/button';

import { useAuth } from "@/lib/dataContext";
export default function CreateDepartments() {

  const {currentUser,token} = useAuth()
  const departmentForm = useForm({
    resolver: yupResolver(validateDepartmentForm),
    defaultValues: {
      name: '', room: ''
    }
  })
  const onSubmit = (values) => {
    console.log('v', values)
  }

  useEffect(() => {

    if (currentUser?.role!== 'admin') {
      navigate('/not-authorized')
    }
  }, [token])



  return (
    <Layout>
      <Topbar title="Add New Department" mode="create" />
      <div className='w-[80%] m-auto py-4'>
        <Form {...departmentForm}>
          <form onSubmit={departmentForm.handleSubmit(onSubmit)} className='grid space-y-8'>
            <Button type="submit" className={"ml-auto"}>Save</Button>
            <div className='grid gap-8'>
              <FormField
                control={departmentForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={'relative'}>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Department Name" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
              <FormField
                control={departmentForm.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Room Number (eg. N604)" {...field} />
                    </FormControl>
                    <FormMessage className={'text-xs absolute -bottom-5 left-0'} />
                  </FormItem>
                )}
              >
              </FormField>
            </div>
          </form>
        </Form>
      </div>
    </Layout>

  )
}
