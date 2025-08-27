import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import { toast } from 'react-hot-toast'
import {
  FormField,
  FormDescription,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateCompaniesForm } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth, useClient } from "@/lib/dataContext";
import { useNavigate } from "react-router";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Combobox } from "@/components/combobox";

const CreateCompanies = () => {
  const { token, currentUser } = useAuth();

  const [industries, setIndustries] = useState([])
  const [states, setStates] = useState([])
  const [open, setOpen] = useState(false)
  const [cities, setCities] = useState([])
  const { client } = useClient()

  const navigate = useNavigate();
  // const [view, setView] = useState('row')
  const companiesForm = useForm({
    resolver: yupResolver(validateCompaniesForm),
    defaultValues: {
      name: "",
      email: "",
      mission: "",
      industry: "",
      website: "",
      city: "",
      state: "",
      street: "",
      zipcode: "",
    },
  });
  useEffect(() => {
    const loadData = async () => {
      let res = await client.industry.fetchAll()
      if (res.status === 200) {
        console.log(res.data.data.industries, 'ind')
        setIndustries(res.data.data.industries)
      }
      let stateres= await client.stateCities.fetchStates()
      if (stateres.status === 200) {
        setStates(stateres.data.states)
      }
    }

    if (currentUser && currentUser?.role !== "admin") {
      navigate("/not-authorized");
    }
    if (!token) {
      navigate('/login')
    }
    loadData()
  }, [token]);
 const getCities = async (state) => {
    console.log('state', state)
    let res = await client.stateCities.fetchCitiesByState(state)
    if (res.status === 200) {
      console.log(res.data.data, 'city')
      setCities(res.data.data)
    }
    }
  const onSubmit = async (values) => {
    let res = await client.companies.create(values, { credentials: 'include' })
    // if registeration successed
    console.log('sre', res)
    if (res.status == 200) {
      toast.success("successfully created company")
    }
    else if (res.status == 201) {
      toast.info("Company with this email already exists")
    }
    else {
      toast.error("Error creating company")
    }
  }
  const onError = (err) => {
    console.log(err, 'err')
  }
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Add New Company" mode="create" />
          <div className="w-[80%] m-auto py-4">
            <Form {...companiesForm}>
              <form
                onSubmit={companiesForm.handleSubmit(onSubmit, onError)}
                className="grid space-y-8"
              >
                <Button type="submit" className={"ml-auto"}>
                  Save
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={companiesForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className={"relative"}>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={companiesForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Email" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
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
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    control={companiesForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose Industry</FormLabel>
                        <Combobox dataList={industries} controller={field} type="industry"/>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    control={companiesForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={companiesForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>

                     <FormLabel>Choose State</FormLabel>
                        <Combobox dataList={states} controller={field} type="state" getCities={getCities}/>

                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={companiesForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose City</FormLabel>
                        <Combobox dataList={cities} controller={field} type="city" />
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div className="grid grid-cols-2 gap-2">

                  <FormField
                    control={companiesForm.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="xxx street" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={companiesForm.control}
                    name="zipcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                          <Input placeholder="xxxxxx-xxxx" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormDescription>
                    This is Company&apos;s Location
                  </FormDescription>
                </div>
              </form>
            </Form>
          </div>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default CreateCompanies;
